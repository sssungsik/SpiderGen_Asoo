
/**
Constructor
Do not call Function in Constructor.
*/
AWebViewAttrProp = class AWebViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AWebView/';
	

    }
}



AWebViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	//this.insertCommonAttr();
};

