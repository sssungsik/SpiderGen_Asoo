

/**
Constructor
Do not call Function in Constructor.
*/
ASplitViewAttrProp = class ASplitViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ASplitView/';
	
	

    }
}



ASplitViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	//common
	this.insertCommonAttr();

};

