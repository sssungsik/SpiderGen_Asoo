
/**
Constructor
Do not call Function in Constructor.
*/
ATextBoxAttrProp = class ATextBoxAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ATextBox/';
	
	

    }
}



ATextBoxAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//common
	this.insertCommonAttr();
};

/*
ATextBoxAttrProp.prototype.onTextValueChange = function(comp, info)
{
	var compId = comp.getComponentId();
	var view = theApp.getLayoutView();
	
	//if(compId=='Html')
	if(compId=='Text')
	{
		this.applyValue(comp, info);
		if(view)
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				var selComp = this.selCompArr[i];
				var id = selComp.getComponentId();
				//view.getDocument().treeRename(selComp, id!=''?id:(selComp.getAttr(iWin.afc.ATTR_CLASS) + ' "' + selComp.getHtml() + '"'));
				view.getDocument().treeRename(selComp, id!=''?id:(selComp.getAttr(iWin.afc.ATTR_CLASS) + ' "' + selComp.getText() + '"'));
			}
		}

		return;
	}
	
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
};
*/

/*
function ATextBoxAttrProp*onCheckBtnClick(comp, info)
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
	
	super.onCheckBtnClick(comp, info);
};
*/
