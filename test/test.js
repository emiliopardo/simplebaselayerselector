import Simplebaselayerselector from 'facade/simplebaselayerselector';

const ortofoto2016_color = new M.layer.WMS({
  url: 'http://www.ideandalucia.es/wms/ortofoto2016?',
  name: 'ortofotografia_2016_rgb',
  legend: 'Ortofotografía Color 0,5 metros/pixel (Año 2016)',
  transparent: false,
  tiled: true
}, {
  styles: 'default'
})

ortofoto2016_color.setLegendURL('https://www.ideandalucia.es/visor/leyendas/ortofoto2016_color.png')

const ortofoto2016_pancromatica = new M.layer.WMS({
  url: 'http://www.ideandalucia.es/wms/ortofoto2016?',
  name: 'ortofotografia_2016_pancromatico',
  legend: 'Ortofotografía Pancromática 0,5 metros/pixel (Año 2016)',
  transparent: false,
  tiled: true
}, {
  styles: 'default'
})

ortofoto2016_pancromatica.setLegendURL('https://www.ideandalucia.es/visor/leyendas/ortofoto2016_pancromatico.png');

const ortofoto2016_infrarrojo = new M.layer.WMS({
  url: 'http://www.ideandalucia.es/wms/ortofoto2016?',
  name: 'ortofotografia_2016_infrarrojo',
  legend: 'Ortofotografía Infrarrojo 0,5 metros/pixel (Año 2016)',
  transparent: false,
  tiled: true
}, {
  styles: 'default'
})

ortofoto2016_infrarrojo.setLegendURL('https://www.ideandalucia.es/visor/leyendas/ortofoto2016_infrarrojo.png');


const mdt_siose2013 = new M.layer.WMS({
  url: 'https://www.ideandalucia.es/wms/siose_2013?',
  name: 'sombreado_siose_2013',
  legend: 'Siose + MDT 2013',
  transparent: false,
  tiled: true
}, {
  styles: 'default'
})

mdt_siose2013.setLegendURL('https://www.ideandalucia.es/visor/leyendas/siose_2013.png');

const mdt_2016 = new M.layer.WMS({
  url: 'https://www.ideandalucia.es/wms/mdt_2016?',
  name: 'sombreado_orografico_2016,modelo_digital_terreno_2016_color',
  legend: 'MDT 2016',
  transparent: false,
  tiled: true
}, {
  styles: 'default'
})

mdt_2016.setLegendURL('https://www.ideandalucia.es/visor/leyendas/mdt_2016_tintas_hipsometricas.png');

const CDAU_Base = new M.layer.WMS({
  url: 'https://www.callejerodeandalucia.es/servicios/base/wms?',
  name: 'CDAU_base',
  legend: 'Base Cartográfica Callejero Digital de Andalucía',
  transparent: false,
  tiled: true
})

CDAU_Base.setLegendURL('https://www.ideandalucia.es/visor/leyendas/cdau_base.png');

const MapaAndalucia = new M.layer.WMS({
  url: 'https://www.ideandalucia.es/services/andalucia/wms?',
  name: '00_Mapa_Andalucia',
  legend: 'Mapa Topográfico de Andalucía',
  transparent: false,
  tiled: true
})

const map = M.map({
  container: 'mapjs',
  // layers: [ortofoto2016_color,
  //   ortofoto2016_pancromatica,
  //   ortofoto2016_infrarrojo,
  //   mdt_siose2013,
  //   mdt_2016,
  //   CDAU_Base,
  //   MapaAndalucia],
  // maxExtent: [100401, 3987100, 621273, 4288700],
  wmcfiles: ['https://www.ideandalucia.es/visor/wmc/mapa_base.xml*Mapa'],
  // wmcfiles: ['https://www.ideandalucia.es/visor/wmc/mapa_base.xml*Mapa',
  // 'http://www.juntadeandalucia.es/institutodeestadisticaycartografia/WMC/tematicos/EPLA_todos.xml*Todos'],
  projection: 'EPSG:25830*m',
});

map.addControls(['ScaleLine', 'Scale', 'Mouse', 'panzoombar', 'layerSwitcher']);


//const config ={displayBaseLayersInLayerSwitcher: false}
//const config ={displayBaseLayersInLayerSwitcher: true}


//const mp = new Simplebaselayerselector(config);
const mp = new Simplebaselayerselector();

map.addPlugin(mp);

mp.on(M.evt.ADDED_TO_MAP, ()=>{
  console.log('se cargo el plugin')
})
