const Datastore = require('nedb');
const stations_sba = new Datastore('stations_sba');
stations_sba.loadDatabase();
stations_sba.find({}).sort({ type: 1 }).exec(function (err, data) {
   if (err) {
       response.end();
       return;
   }
   console.log('dataaaa '+data)
});