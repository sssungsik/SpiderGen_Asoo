
/**
Constructor
Do not call Function in Constructor.
*/
ASliderAttrProp = class ASliderAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		//TODO:edit here
		this.attrPath = BaseProp.ATTR_PATH + 'ASlider/';
	
	

    }
}



ASliderAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};
