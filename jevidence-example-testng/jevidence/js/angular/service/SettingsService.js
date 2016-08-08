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

}]);