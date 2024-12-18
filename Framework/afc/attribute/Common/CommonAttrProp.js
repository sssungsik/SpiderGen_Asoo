
/**
Constructor
Do not call Function in Constructor.
*/
CommonAttrProp = class CommonAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'Common/';
	
	

    }
}



CommonAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.insertCommonAttr();
};
