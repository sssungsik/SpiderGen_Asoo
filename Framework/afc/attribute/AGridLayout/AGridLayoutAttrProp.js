
/**
Constructor
Do not call Function in Constructor.
*/
AGridLayoutAttrProp = class AGridLayoutAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		//TODO:edit here
		this.attrPath = BaseProp.ATTR_PATH + 'AGridLayout/';
	
	

    }
}



AGridLayoutAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	//common
	this.insertCommonAttr();
};
