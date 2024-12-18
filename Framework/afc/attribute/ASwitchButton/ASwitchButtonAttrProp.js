
/**
Constructor
Do not call Function in Constructor.
*/
ASwitchButtonAttrProp = class ASwitchButtonAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ASwitchButton/';
	
	

    }
}



ASwitchButtonAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	//TODO:edit here
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//common
	this.insertCommonAttr();
};
