import Service from './../models/service.model';

export const createServices = async () => {
	try{
		// db.roles.estimatedDocumentCount() is a mongosh (mongo shell) method to count the number of records in the table 
		const count = await Service.estimatedDocumentCount();
		
		if(count > 0) return;

		const values = await Promise.all([
			new Service({ service : 'oil', value : 2500 }).save(),
			new Service({ service : 'filter', value : 2000 }).save(),
			new Service({ service : 'strap', value : 4300 }).save(),
			new Service({ service : 'general', value : 10000 }).save(),
			new Service({ service : 'paint', value : 20399 }).save(),
			new Service({ service : 'other', value : 7000 }).save()
		]);

		console.info(values);
	}catch(err){
		console.error(err);
	}
}