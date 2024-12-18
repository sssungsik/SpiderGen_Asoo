
/**
Constructor
Do not call Function in Constructor.
*/
ASelectBoxAttrProp = class ASelectBoxAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ASelectBox/';
	
	

    }
}



ASelectBoxAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');
	
	//common
	this.insertCommonAttr();
};

