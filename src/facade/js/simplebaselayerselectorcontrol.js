/* eslint-disable no-console */

/**
 * @module M/control/SimplebaselayerselectorControl
 */

import SimplebaselayerselectorImplControl from 'impl/simplebaselayerselectorcontrol';
import template from 'templates/simplebaselayerselector';

export default class SimplebaselayerselectorControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(config) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(SimplebaselayerselectorImplControl)) {
      M.exception('La implementación usada no puede crear controles SimplebaselayerselectorControl');
    }
    // 2. implementation of this control
    const impl = new SimplebaselayerselectorImplControl();
    super(impl, 'Simplebaselayerselector');
    this.template = template;
    this.templateVars = '';
    this.config = config

    if (this.config) {
      this.displayBaseLayersInLayerSwitcher = this.config.displayBaseLayersInLayerSwitcher
    } else {
      this.displayBaseLayersInLayerSwitcher = false;
    }
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    return new Promise((success, fail) => {
      const html = M.template.compileSync(this.template, this.templateVars);
      // Añadir código dependiente del DOM
      this.element = html;
      this.addEvents(html);
      success(html);
      //Se controla la carga inicial del mapa
      this.map_.on(M.evt.COMPLETED, () => {
        this.setConfig()
      })
      //Se controla la carga o cambio de WMC
      this.map_.on(M.evt.CHANGE_WMC, () => {
        this.setConfig()
      })
    });
  }

  addEvents(html) {
    this.layerSelector = html.querySelector('div#contenedor-baseLayer-layers');
    // html.addEventListener('click', () => {
    //   this.layerSelector.animate([
    //     { width: "0px", height: '0px', offset: 0 },
    //     { width: ((this.layers.length * 76) + 10) + 'px', height: '85px', offset: 1 }
    //   ], {
    //     duration: 300,
    //     easing: 'ease',
    //     iterations: 1
    //   });

    //   setTimeout(function () {
    //     this.divImagenes = document.getElementsByClassName("m-selector-baselayer-layers-content");
    //     for (var i = 0; i < this.divImagenes.length; i++) {
    //       this.divImagenes[i].style.display = "block";
    //     }
    //   }, 200);
    //   this.layerSelector.style.width = ((this.layers.length * 76) + 10) + 'px';
    //   this.layerSelector.style.display = 'inline-block';

    // })

    html.addEventListener('click', () => {
      if (this.layerSelector.style.display != 'inline-block') {
        this.layerSelector.animate([
          { width: "0px", height: '0px', offset: 0 },
          { width: ((this.layers.length * 76) + 10) + 'px', height: '85px', offset: 1 }
        ], {
          duration: 300,
          easing: 'ease',
          iterations: 1
        });

        setTimeout(function () {
          this.divImagenes = document.getElementsByClassName("m-selector-baselayer-layers-content");
          for (var i = 0; i < this.divImagenes.length; i++) {
            this.divImagenes[i].style.display = "block";
          }
        }, 200);
        this.layerSelector.style.width = ((this.layers.length * 76) + 10) + 'px';
        this.layerSelector.style.display = 'inline-block';


      } else {
        this.layerSelector.animate([
          { width: ((this.layers.length * 76) + 10) + 'px', height: '85px', offset: 0 },
          { width: "0px", height: '0px', offset: 1 }
        ], {
          duration: 300,
          easing: 'ease',
          iterations: 1
        });
        setTimeout(function () {
          this.layerSelector = html.querySelector('div#contenedor-baseLayer-layers');
          this.divImagenes = document.getElementsByClassName("m-selector-baselayer-layers-content");
          for (var i = 0; i < this.divImagenes.length; i++) {
            this.divImagenes[i].style.display = "none";
          }
          this.layerSelector.style.width = '0px';
          this.layerSelector.style.display = 'none';
        }, 200);

      }
    })
    NodeList.prototype.addEventListener = function (event_name, callback, useCapture) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(event_name, callback, useCapture);
      }
    };
    html.querySelectorAll('div.m-selector-baselayer-layers-content').addEventListener('mouseleave', (event) => {
      let target = event.currentTarget;
      target.style.border = 'solid 2px #cdcdcd';
    });

    html.querySelectorAll('div.m-selector-baselayer-layers-content').addEventListener('click', (e) => {
      let find = false;
      do {
        for (let i = 0; i < this.layers.length; i++) {
          if (this.layers[i].name == e.target.name) {
            this.selectLayer(this.layers[i])
            find = true;
          }
        }
      } while (!find);
    });

    this.layerSelector.addEventListener('mouseover', () => {
      this.layerSelector.style.display = 'inline-block';
    })

    this.layerSelector.addEventListener('mouseleave', () => {
      this.divImagenes = document.getElementsByClassName("m-selector-baselayer-layers-content");
      for (var i = 0; i < this.divImagenes.length; i++) {
        this.divImagenes[i].style.setProperty("display", "none");
      }
      this.layerSelector.style.display = 'none';
    })

    if (this.map_.getControls({ 'name': 'scaleline' })) {
      let scaleline = document.getElementsByClassName('m-scaleline')[0];
      scaleline.style.left = '100px';
      scaleline.style.bottom = '10px';
      scaleline.style.position = 'absolute';
    }
  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    // calls super to manage de/activation
    super.activate();
  }
  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {
    // calls super to manage de/activation
    super.deactivate();
  }
  /**
   * This function gets activation button
   *
   * @public
   * @function
   * @param {HTML} html of control
   * @api stable
   */
  getActivationButton(html) {
    return html.querySelector('.m-simplebaselayerselector button');
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof SimplebaselayerselectorControl;
  }

  // Add your own functions

  setConfig() {
    this.layers = this.map_.getBaseLayers();
    this.baseLayers = new Array();
    for (let index = 0; index < this.layers.length; index++) {
      const layer = this.layers[index];
      if (layer.impl_.transparent == false) {
        this.baseLayers.push(layer)
      }
    }
    this.selectedLayer = this.baseLayers[0];
    this.selectedLayerImg = this.selectedLayer.impl_.legendUrl_;
    this.selectedLayerLegend = this.selectedLayer.legend
    this.layerName = this.selectedLayer.name

    //oculto los baseLayers del layerswitcher si el control existe y 
    if (this.displayBaseLayersInLayerSwitcher == false) {
      if (this.map_.getControls({ 'name': 'layerswitcher' }).length > 0) {
        for (let index = 0; index < this.layers.length; index++) {
          const element = this.layers[index];
          element.displayInLayerSwitcher = false;
        }
      }
    }
    this.templateVars = { vars: { selectedLayerLegend: this.selectedLayerLegend, selectedLayerLegendURL: this.selectedLayerImg, selectedLayerName: this.layerName, layers: this.baseLayers } };
    this.render()
  }

  selectLayer(layer) {
    this.changeSelectedLayerStyle(event.target.name)
    document.getElementById('selectedBaseLayer').src = layer.impl_.legendUrl_;
    document.getElementById('selectedBaseLayer').alt = layer.legend;
    document.getElementById('selectedBaseLayer').title = layer.legend;

    this.changeVisible(layer.name);

    if (this.map_.getControls({ 'name': 'layerswitcher' }).length > 0) {
      this.map_.getControls({ 'name': 'layerswitcher' })[0].render();
    }
  }

  render() {
    const html = M.template.compileSync(this.template, this.templateVars);
    this.element.children[0].innerHTML = html.children[0].innerHTML;
    this.element.children[1].innerHTML = html.children[1].innerHTML;

    if (this.map_.getControls({ 'name': 'layerswitcher' }) && this.displayBaseLayersInLayerSwitcher) {
      setTimeout(() => {
        let baseLayersSwitcher = document.getElementById('m-layerswitcher-panel');
        baseLayersSwitcher.addEventListener('click', (event) => {
          let selectedLayer = event.target
          this.updateSelectedLayer(selectedLayer.getAttribute('data-layer-name'))
        })
      }, 200)
    }
    //añado el listener click de los baseLayers
    this.element.querySelectorAll('div.m-selector-baselayer-layers-content').addEventListener('click', (e) => {
      let find = false;
      do {
        for (let i = 0; i < this.layers.length; i++) {
          if (this.layers[i].name == e.target.name) {
            this.selectLayer(this.layers[i])
            find = true;
          }
        }
      } while (!find);
    });
  }

  changeVisible(name) {
    for (let index = 0; index < this.baseLayers.length; index++) {
      const baseLayer = this.baseLayers[index];
      if (baseLayer.name == name) {
        baseLayer.setVisible(true);
      } else {
        baseLayer.setVisible(false);
      }
    }
  }

  changeSelectedLayerStyle(selectedLayer) {
    let baseLayersImg = document.getElementById('contenedor-baseLayer-layers').querySelectorAll('img');
    for (let index = 0; index < baseLayersImg.length; index++) {
      const element = baseLayersImg[index];
      if (element.name == selectedLayer) {
        element.className = 'm-selector-baselayer-layers-image-seleccionada'
      } else {
        element.className = 'm-selector-baselayer-layers-image'
      }
    }
  }

  updateSelectedLayer(layerName) {
    let find = false;
    do {
      for (let i = 0; i < this.layers.length; i++) {
        if (this.layers[i].name == layerName) {
          this.selectLayer(this.layers[i])
          this.selectedLayer = this.layers[i];
          find = true;
        }
      }
    } while (!find);

    document.getElementById('selectedBaseLayer').src = this.selectedLayer.impl_.legendUrl_;
    document.getElementById('selectedBaseLayer').alt = this.selectedLayer.legend;
    document.getElementById('selectedBaseLayer').title = this.selectedLayer.legend;
    this.changeSelectedLayerStyle(layerName)
  }
}
