
/**
Constructor
Do not call Function in Constructor.
*/
AScrollBarAttrProp = class AScrollBarAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AScrollBar/';
	
	

    }
}



AScrollBarAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.insertCommonAttr();
};

