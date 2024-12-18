
/**
Constructor
Do not call Function in Constructor.
*/
AToolBarAttrProp = class AToolBarAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AToolBar/';
	
	

    }
}



AToolBarAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	
	//common
	this.insertCommonAttr();
};

