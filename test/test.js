import Simplebaselayerselector from 'facade/simplebaselayerselector';

const map = M.map({
  container: 'mapjs',
  // layers: [ortofoto2016_color,
  //   ortofoto2016_pancromatica,
  //   ortofoto2016_infrarrojo,
  //   mdt_siose2013,
  //   mdt_2016,
  //   CDAU_Base,
  //   MapaAndalucia],
  // maxExtent: [100401,3987100,621273,4288700],
  // wmcfiles: ['https://www.ideandalucia.es/visor/wmc/mapa_base.xml*Mapa'],
  wmcfiles: ['https://www.ideandalucia.es/visor/wmc/mapa_base.xml*Mapa','http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_todos.xml*Todos'],
  // wmcfiles: ['http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_todos.xml*Todos',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_agricultura.xml*Sector Agricultura',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_comercio.xml*Sector Comercio',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_construccion.xml*Sector Construcción',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_energia.xml*Sector Energía',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_hosteleria.xml*Sector Hostelería',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_industria.xml*Sector Industria',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_servicios.xml*Sector Servicios',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_transporte.xml*Sector Transporte y Almacenamiento'],
  projection: 'EPSG:25830*m',
 });

//map.addControls(['ScaleLine', 'Scale', 'Mouse', 'panzoombar']);
map.addControls(['ScaleLine', 'Scale', 'Mouse', 'panzoombar', 'layerSwitcher']);

const mp = new Simplebaselayerselector();

map.addPlugin(mp);
