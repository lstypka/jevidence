reportNgApp.service('SettingsService', [function () {

     this.getDeploymentType = function() {
            if(jEvidenceSettings.settings) {
                for(var i = 0; i < jEvidenceSettings.settings.length; i++) {
                    if(jEvidenceSettings.settings[i].key === 'deployType') {
                        return jEvidenceSettings.settings[i].value;
                    }
                }
            }
            return "server";
      };

      this.isEmbedded = function() {
        return this.getDeploymentType() === 'embedded';
      };

      this.isServer = function() {
        return this.getDeploymentType() === 'server';
      };

      this.saveConfiguration = function(config) {
        if(localStorage) {
            localStorage.setItem('jEvidenceConfig', config);
        }
      };

      this.loadConfiguration = function(){
         if(localStorage) {
            var loadedConfig = localStorage.getItem('jEvidenceConfig');
            if(loadedConfig){
                return JSON.parse(loadedConfig);
            }
         }

            return jEvidenceLayoutConfig;
      };

      this.loadDefaultConfiguration = function(){
            return jEvidenceLayoutConfig;
      };

}]);