import Service from './../models/service.model';

export const transactionService = async (service) => {
	const availableServices = await Service.find({}, { 'createdAt': 0, 'updatedAt' : 0 });
	let totalCost = 0;
	availableServices.find(availableService => {
		 if (service.hasOwnProperty(availableService.service) && service[availableService.service]) totalCost += availableService.value;
	});
	return totalCost;
}