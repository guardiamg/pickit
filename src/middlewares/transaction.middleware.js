export const checkPaintCar = async (req, res, next) => {
	const servicePaint = req.body.paint;
	const carColor = req.car.color
	if (servicePaint && carColor === 'gray') return res.status(400).json({ ok : false, carColor,  msg : 'Painting service not allowed' })
	next()
}