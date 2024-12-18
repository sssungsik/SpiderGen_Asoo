
/**
Constructor
Do not call Function in Constructor.
*/
ARadioButtonAttrProp = class ARadioButtonAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ARadioButton/';
	
	

    }
}



ARadioButtonAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Data', this.attrPath+'Data.lay');
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//common
	this.insertCommonAttr();
};

ARadioButtonAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	/*
	if(valGroup=='ATTR_VALUE')
	{
		if(dataKey=='data-select-class')
		{
			selComp.setSelectStyle(value);
		}
	}
	*/
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

/*
ARadioButtonAttrProp.prototype.onTextValueChange = function(comp, info)
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