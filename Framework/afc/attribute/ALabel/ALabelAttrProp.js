
/**
Constructor
Do not call Function in Constructor.
*/
ALabelAttrProp = class ALabelAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ALabel/';
	
	

    }
}



ALabelAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};

/*
ALabelAttrProp.prototype.onTextValueChange = function(comp, info)
{
	var compId = comp.getComponentId();
	var view = theApp.getLayoutView();
	
	if(compId=='Text')
	{
		this.applyValue(comp, info);
		if(view)
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				var selComp = this.selCompArr[i];
				var id = selComp.getComponentId();
				view.getDocument().treeRename(selComp, id!=''?id:(selComp.getAttr(iWin.afc.ATTR_CLASS) + ' "' + selComp.getText() + '"'));
			}
		}

		return;
	}
	
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
};
*/

//asoocool 20180419
ALabelAttrProp.prototype.onCheckBtnClick = function(comp, info)
{
	var checked = comp.getCheck(),
		compId = comp.getComponentId();
	
	if(compId=='data-pre')
	{
		var selComp;
		for(var i=0; i<this.selCompArr.length; i++)
		{
			selComp = this.selCompArr[i];
			selComp.isPre = checked;
			selComp.setText(selComp.getText());
		}
	}
	
	BaseProp.prototype.onCheckBtnClick.call(this, comp, info);
};
