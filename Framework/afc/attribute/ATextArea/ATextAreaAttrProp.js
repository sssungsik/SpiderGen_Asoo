
/**
Constructor
Do not call Function in Constructor.
*/
ATextAreaAttrProp = class ATextAreaAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ATextArea/';
	
	

    }
}



ATextAreaAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};

/*
ATextAreaAttrProp.prototype.onTextValueChange = function(comp, info)
{
	var compId = comp.getComponentId();
	var view = theApp.getLayoutView();
	
	if(compId=='InnerText')
	{
		this.applyValue(comp, info);
		if(view)
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				var selComp = this.selCompArr[i];
				var id = selComp.getComponentId();
				view.getDocument().treeRename(selComp, id!=''?id:(selComp.getAttr(afc_.ATTR_CLASS) + ' "' + selComp.getText() + '"'));
			}
		}

		return;
	}
	
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
};
*/