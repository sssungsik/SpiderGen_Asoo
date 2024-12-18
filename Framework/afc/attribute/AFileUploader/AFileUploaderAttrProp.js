
/**
Constructor
Do not call Function in Constructor.
*/
AFileUploaderAttrProp = class AFileUploaderAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.accept = null;
		this.attrPath = 'Framework/afc/attribute/AFileUploader/';
		
		this.saveSelArr = null;	
	

    }
}



AFileUploaderAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	//TODO:edit here
	this.acc.insertItem('Info', this.attrPath+'Info.lay');
	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');

	//common
	this.insertCommonAttr();
};


AFileUploaderAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal;
	if(valGroup=='ATTR_VALUE')
	{
		if(['readonly','disabled'].indexOf(dataKey)>-1)
		{
			var childItem = selComp.element.children[0].children[0].acomp.getChildren();
			for(var i=0; i<childItem.length; i++)
			{
				BaseProp.prototype.applyValueToSelComp.call(selComp, childItem[i], dataKey, valGroup, value);
			}
		}
	}
	
	BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};


AFileUploaderAttrProp.prototype.onAcceptSelectChange = function(comp, value)
{
	var accept = comp.getNextComp();
	
	if(value!="direct")
	{
		accept.setText(value);
		accept.enable(false);
	}
	else 
	{
		var tmpValue = value;
		value = this.$ele.context.getAttribute('data-accept-type');
		accept.setText((value=="direct")?"":value);
		accept.enable(true);
		value = tmpValue;
	}
	
	this.onTextValueChange(comp, value);
	this.onTextValueChange(accept, value);
};


AFileUploaderAttrProp.prototype.onStyleFocus = function(comp, info)
{
	this.saveValue = comp.getText().trim();
	
	if(!this.saveValue) return;
	
	this.saveSelArr = [];

	var compId = comp.getComponentId();
	for(var i=0; i<this.selCompArr.length; i++)
	{
		var children = this.selCompArr[i].childComp.getChildren();
		for(var j=0; j<children.length; j++)
		{
			if(compId.indexOf("-label-")>-1)
			{
				if(children[j].getAttr("data-base")=="ATextField") children[j].addClass(this.saveValue);		
			}
			else
			{
				if(children[j].getAttr("data-base")=="AButton") children[j].addClass(this.saveValue);		
			}
		}
		this.saveSelArr[i] = this.selCompArr[i];
	}
};

AFileUploaderAttrProp.prototype.onStyleBlur = function(comp, info)
{
	this.saveValue = comp.getText().trim();
	if(!this.saveValue) return;

	var compId = comp.getComponentId();
	for(var i=0; i<this.saveSelArr.length; i++)
	{
		var children = this.saveSelArr[i].childComp.getChildren();
		for(var j=0; j<children.length; j++)
		{
			if(compId.indexOf("-label-")>-1)
			{
				if(children[j].getAttr("data-base")=="ATextField") children[j].removeClass(this.saveValue);		
			}
			else
			{
				if(children[j].getAttr("data-base")=="AButton") children[j].removeClass(this.saveValue);		
			}
		}
	}
};

