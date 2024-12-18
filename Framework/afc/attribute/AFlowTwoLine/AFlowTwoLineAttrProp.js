
/**
Constructor
Do not call Function in Constructor.
*/
AFlowTwoLineAttrProp = class AFlowTwoLineAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = 'Framework/afc/attribute/AFlowTwoLine/';
		
		//this.saveSelArr = null;
	
	

    }
}



AFlowTwoLineAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);

	this.acc.insertItem('Type', this.attrPath+'Type.lay');

	//common
	//this.insertCommonAttr();
};

AFlowTwoLineAttrProp.prototype.online_typeChange = function(comp, info, e)
{
	this.onSelectValueChange(comp, info);
	
	if(comp.compId == 'data-direct')
	{
		for(var i=0; i<this.selCompArr.length; i++)
		{
			this.selCompArr[i].drawPath();
		}
	}
	
	if(comp.compId == 'data-arrow-position')
	{
		for(var i=0; i<this.selCompArr.length; i++)
		{
			this.selCompArr[i].setArrowPosition(info);
		}
	}
	
};

AFlowTwoLineAttrProp.prototype.onColorPickerClick = function(comp, info)
{
	var wnd = new AWindow_('ColorPicker')
	ofs = comp.get$ele().offset(),
	w = 190, compH = comp.getHeight(), compId = comp.getComponentId();
		
	wnd.valueComp = comp;
	wnd.opts = {
		mode: 0,
		color: comp.$ele.css('background-color'),
		noGradient: true
	};
	
	
	//컬러피커의 그라데이션 모드인 경우
	if(compId=='background-image')
	{
		wnd.opts.mode = 1;
		wnd.opts.noGradient = false;
		wnd.opts.color = null;
	}
	
	//wnd.setResultListener(this);
	wnd.setWindowOption(
	{
		isModal: true,
		isFocusLostClose: true,
		modalBgOption: 'none',
	});
	
	if(ofs.left+190 > $(window).width()) ofs.left = $(window).width() - w - 5;

	wnd.open('Source/popup/ColorPicker.lay', null, ofs.left, ofs.top+compH, w, 'auto');
	var thisObj = this;
	wnd.setResultCallback(function(result)
	{
		// '' 이 리턴될 수도 있으므로 !result 로 비교하면 안됨
		if(result==undefined) return;
		
		//-------------------------------------------
		//	valueComp 자신에게 적용하는 부분
		
		//컬러피커의 그라데이션 셋팅인 경우
		if(compId=='background-image')
		{
			comp.$ele.css('background-image', result);
			
			// 이미지 경로 제거, 이미지 선택 버튼 show.
			comp.setText('');
			comp.getNextComp().show();
		}
		
		//color, border-color ...
		else comp.$ele.css('background-color', result);
		
		//selComp 에 적용하는 부분
		thisObj.applyValue(comp, result);
		
		for(var i=0; i<thisObj.selCompArr.length; i++)
		{
			thisObj.selCompArr[i].setLineColor(result);
		}
	});
};

AFlowTwoLineAttrProp.prototype.onNumberValueChange = function(comp, info, e)
{
	if(info > 100)
	{
		info = 100;
		comp.setText(info);
	}
	else if(info < 0)
	{
		info = 0;
		comp.setText(info);
	}
	
	BaseProp.prototype.onNumberValueChange.call(this, comp, info, e);
		
	for(var i=0; i<this.selCompArr.length; i++)
	{
		this.selCompArr[i].drawPath();
	}	
};

AFlowTwoLineAttrProp.prototype.onCheckBtnClick = function(comp, info, e)
{
	BaseProp.prototype.onCheckBtnClick.call(this, comp, info, e);
	
	if(comp.compId == 'data-arrow')
	{
		for(var i=0; i<this.selCompArr.length; i++)
		{
			this.selCompArr[i].setArrow(comp.getCheck());
		}
	}
};	

AFlowTwoLineAttrProp.prototype.onStrokeWidthChange = function(comp, info, e)
{
	if(info < 0) 
	{
		info = 0;
		comp.setText(0);
	}
	this.onSelectValueChange(comp, info);
	
	if(comp.compId == 'data-stroke-width')
	{
		for(var i=0; i<this.selCompArr.length; i++)
		{
			this.selCompArr[i].setStrokeWidth(info);
		}
	}
};