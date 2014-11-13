import DS from 'ember-data';

export default DS.IndexedDBAdapter.extend({
    databaseName: 'WorldTimeZones',
    version: 1,
    migrations: function() {
        this.addModel('timezone');
    }
});
