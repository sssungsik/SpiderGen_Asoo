
/**
Constructor
Do not call Function in Constructor.
*/
AFlexViewAttrProp = class AFlexViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AFlexView/';
	
	

    }
}



AFlexViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	//common
	this.insertCommonAttr();

};

