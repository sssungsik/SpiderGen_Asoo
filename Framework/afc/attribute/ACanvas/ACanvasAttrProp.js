
/**
Constructor
Do not call Function in Constructor.
*/
ACanvasAttrProp = class ACanvasAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ACanvas/';
	
	

    }
}



ACanvasAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.insertCommonAttr();
};

