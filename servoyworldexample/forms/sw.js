
/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"92A447B5-B478-4CFF-AE0B-48BC4B840CCE"}
 */
function click(event) {
	application.output('clicked!')
	
	elements.servoyworldcomponent_1.requestFocus();
	
	elements.servoyworldcomponent_1.hidevalues = !elements.servoyworldcomponent_1.hidevalues;
	
}
