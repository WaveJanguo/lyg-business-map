import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { businesses, categories, districts, type Business } from './data/businesses';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

// Fix leaflet marker icon issue
const iconDefault = L.Icon.Default as any;
delete iconDefault.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DEFAULT_CENTER: [number, number] = [34.84, 119.13]; // 赣榆区中心
const DEFAULT_ZOOM = 12;

function App() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchText = !searchText || 
        b.name.toLowerCase().includes(searchText.toLowerCase()) ||
        b.address.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = selectedCategory === 'all' || b.category === selectedCategory;
      const matchDistrict = selectedDistrict === 'all' || b.district === selectedDistrict;
      return matchText && matchCategory && matchDistrict;
    });
  }, [searchText, selectedCategory, selectedDistrict]);

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
  };

  const openNav = (business: Business) => {
    const url = `https://amap.com/navi?from=&to=${encodeURIComponent(business.name + business.address)}&coord=${business.lng},${business.lat}`;
    window.open(url, '_blank');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>连云港赣榆商家导航</h1>
        <p>本地商家地图，一键导航</p>
      </header>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索商家名称或地址..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="content">
        <div className="business-list">
          <div className="list-header">
            <span>共找到 {filteredBusinesses.length} 个商家</span>
          </div>
          <div className="list-items">
            {filteredBusinesses.length === 0 ? (
              <div className="empty">暂无商家</div>
            ) : (
              filteredBusinesses.map(b => (
                <div
                  key={b.id}
                  className={`list-item ${selectedBusiness?.id === b.id ? 'active' : ''}`}
                  onClick={() => handleBusinessClick(b)}
                >
                  <h4>{b.name}</h4>
                  <p className="meta">
                    <span className="tag">{b.category}</span>
                    <span className="tag">{b.district}</span>
                  </p>
                  <p className="address">{b.address}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="map-container">
          <MapContainer
            center={selectedBusiness ? [selectedBusiness.lat, selectedBusiness.lng] : DEFAULT_CENTER}
            zoom={selectedBusiness ? 16 : DEFAULT_ZOOM}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
              attribution='&copy; <a href="https://www.amap.com/">高德地图</a>'
            />
            {filteredBusinesses.map(b => (
              <Marker key={b.id} position={[b.lat, b.lng]}>
                <Popup>
                  <div className="popup">
                    <h5>{b.name}</h5>
                    <p>{b.address}</p>
                    <button onClick={() => openNav(b)}>开始导航</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 连云港赣榆商家导航 - 本地生活，一键找到</p>
      </footer>
    </div>
  );
}

export default App;
