import Simplebaselayerselector from 'facade/simplebaselayerselector';

const map = M.map({
  container: 'mapjs',
});

const mp = new Simplebaselayerselector();

map.addPlugin(mp);
