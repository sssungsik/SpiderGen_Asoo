
/**
Constructor
Do not call Function in Constructor.
*/
ASlideViewAttrProp = class ASlideViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ASlideView/';
	
	

    }
}



ASlideViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	
	//common
	this.insertCommonAttr();
};




