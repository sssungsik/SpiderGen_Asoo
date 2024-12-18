
/**
Constructor
Do not call Function in Constructor.
*/
ATreeAttrProp = class ATreeAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ATree/';
	
	

    }
}



ATreeAttrProp.prototype.init = function(context, evtListener)
{
	
	BaseProp.prototype.init.call(this, context, evtListener);
	
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//common
	this.insertCommonAttr();
	
};
