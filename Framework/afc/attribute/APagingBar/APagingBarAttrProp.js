
/**
Constructor
Do not call Function in Constructor.
*/
APagingBarAttrProp = class APagingBarAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.accept = null;
		this.attrPath = 'Framework/afc/attribute/APagingBar/';
		
		this.saveSelArr = null;	
	

    }
}



APagingBarAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	//TODO:edit here
	//this.acc.insertItem('Info', this.attrPath+'Info.lay');
	//this.acc.insertItem('Style', this.attrPath+'Style.lay');	
	//this.acc.insertItem('Option', this.attrPath+'Option.lay');

	//common
	this.insertCommonAttr();
};


APagingBarAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
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


APagingBarAttrProp.prototype.onStyleFocus = function(comp, info)
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
			if(compId.indexOf("-sign-")>-1)
			{
				if(children[j].getAttr("data-paging-kind")=="sign") children[j].addClass(this.saveValue);		
			}
			else
			{
				if(children[j].getAttr("data-paging-kind")=="number") children[j].addClass(this.saveValue);		
			}
		}
		this.saveSelArr[i] = this.selCompArr[i];
	}
};

APagingBarAttrProp.prototype.onStyleBlur = function(comp, info)
{
	this.saveValue = comp.getText().trim();
	if(!this.saveValue) return;

	var compId = comp.getComponentId();
	for(var i=0; i<this.saveSelArr.length; i++)
	{
		var children = this.saveSelArr[i].childComp.getChildren();
		for(var j=0; j<children.length; j++)
		{
			if(compId.indexOf("-sign-")>-1)
			{
				if(children[j].getAttr("data-paging-kind")=="sign") children[j].removeClass(this.saveValue);		
			}
			else
			{
				if(children[j].getAttr("data-paging-kind")=="number") children[j].removeClass(this.saveValue);		
			}
		}
	}
};




APagingBarAttrProp.prototype.onTextValueChange = function(comp, info)
{
	BaseProp.prototype.onTextValueChange.call(this, comp, info);
	
	var compId = comp.getComponentId();
	var view = theApp.getLayoutView();
	
	if(compId=='data-style')
	{
		if(view)
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				var dataStyle = this.selCompArr[i].getAttr("data-style");
				if(dataStyle) dataStyle = dataStyle.trim();
				
				var children = this.selCompArr[i].childComp.getChildren();
				for(var j=0; j<children.length; j++)
				{
					children[j].removeClass();
					if(dataStyle) children[j].addClass(dataStyle);
				}
			}
		}

	}
	
};


APagingBarAttrProp.prototype.onNumberValueChange = function(comp, info)
{
	BaseProp.prototype.onNumberValueChange.call(this, comp, info);
	
	var value, 
		compW=0, 
		children,
		compId = comp.getComponentId(),
		groupId = comp.getGroupName(),
		view = theApp.getLayoutView();
	
	if(view)
	{
		if(groupId=="CSS_VALUE")
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				children = this.selCompArr[i].childComp.getChildren();
				value = this.selCompArr[i].element.style[compId];

				if(value)
					for(var j=0; j<children.length; j++) children[j].$ele.css(compId, value);
			}
		}
		else if(groupId=="ATTR_VALUE")
		{
			for(var i=0; i<this.selCompArr.length; i++)
			{
				children = this.selCompArr[i].childComp.getChildren();
				value = this.selCompArr[i].getAttr(compId);

				if(value)
				{
					for(var j=0; j<children.length; j++) children[j].$ele.css('width', value);
					
					this.selCompArr[i].childComp.updateWidth();
					/*for(var j=0; j<children.length; j++)
					{
						children[j].$ele.css('width', value);
						compW += children[j].$ele.outerWidth();
					}
					this.selCompArr[i].childComp.setWidth(compW);
					this.selCompArr[i].setWidth(compW);*/
				}
			}

			view.layWorkView.adjCanvas.setCompState(this.selCompArr.slice(), STATE.SELECT);
		}
	}

};





/*function APagingBarAttrProp*onAcceptSelectChange(comp, value)
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
};*/