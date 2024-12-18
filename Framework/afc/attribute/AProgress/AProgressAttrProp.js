
/**
Constructor
Do not call Function in Constructor.
*/
AProgressAttrProp = class AProgressAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		//TODO:edit here
		this.attrPath = BaseProp.ATTR_PATH + 'AProgress/';
	
	

    }
}



AProgressAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	//this.acc.insertItem('Bar', this.attrPath+'Bar.lay');

	//common
	this.insertCommonAttr();
};
