
/**
Constructor
Do not call Function in Constructor.
*/
ADataGridAttrProp = class ADataGridAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'ADataGrid/';
	
	

    }
}



ADataGridAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Option', this.attrPath+'Option.lay');
	this.acc.insertItem('Data', this.attrPath+'Data.lay');

	//this.insertCommonAttr();
};

ADataGridAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	var prevVal, view, pivotGrid;
	if(valGroup=='ATTR_VALUE')
	{
		switch(dataKey)
		{
			case 'data-pivot-grid':
			{
				if(value) 
				{
					view = theApp.getLayoutView();
					if(view) 
					{
						pivotGrid = new AGrid();
						pivotGrid.init();
						
						/*
						pivotGrid.setSgapH(iWin.afc.scrlWidth+'px');
						pivotGrid.posUtil.setSize('30%', 'calc(100% - ' + iWin.afc.scrlWidth + 'px)');
						pivotGrid.posUtil.setStretchValue('height', iWin.afc.scrlWidth+'px');

						selComp.scrlView.posUtil.setPos('left', '30%');
						selComp.scrlView.posUtil.setStretchValue('left', '30%');
						*/
						
						//언두 히스토리에 추가하지 않으며, 컴포넌트가 추가되어도 셀렉트 타겟을 바꾸지 않기 위해
						//트리뷰에만 변경 정보를 report 한다. 
						view.getDocument().addComponent(selComp, [pivotGrid], '0px', '0px', null, false, true, [view.layTreeView], true);
						
						selComp.setPivotGrid(pivotGrid);
						selComp.setPivotGridWidth('30%');
					}
				}
				else
				{
					view = theApp.getLayoutView();
					if(view) 
					{
						selComp.scrlView.posUtil.setPos('left', '0px');
						selComp.scrlView.posUtil.setStretchValue('left', '0px');
						
						view.getDocument().deleteComponent([selComp.getPivotGrid()], true, true);
						selComp.setPivotGrid(null);
					}
				}
				
				var thisObj = this;
				//사이즈 변경을 적용한 후 반영
				setTimeout(function()
				{
					var valCompArr = thisObj.findCompByGroup('SET_VALUE');
					thisObj.updateInfo(null, valCompArr);

				}, 100);
				
			}
			break;

			case 'data-hide-hscrollbar':
			{
				pivotGrid = selComp.getPivotGrid();
				
				if(value) 
				{
					selComp.scrollBarH.hide();
					
					selComp.scrlView.posUtil.setStretchValue('height', '0px');
					selComp.scrollBarV.posUtil.setStretchValue('height', '0px');
					
					if(pivotGrid) pivotGrid.posUtil.setStretchValue('height', '0px');
				}
				else 
				{
					selComp.scrollBarH.show();
					
					selComp.scrlView.posUtil.setStretchValue('height', iWin.afc.scrlWidth+'px');
					selComp.scrollBarV.posUtil.setStretchValue('height', iWin.afc.scrlWidth+'px');
					
					if(pivotGrid) pivotGrid.posUtil.setStretchValue('height', iWin.afc.scrlWidth+'px');
				}
			}
			break;
			
			case 'data-hide-header':
			{
				//setPivotGrid 호출시 설정된 옵션을 전달하므로 옵션세팅
				selComp.setOption({isHideHeader: value});
				if(value) selComp.hideHeader();
				else selComp.showHeader();
			}
			break;
			
			case 'data-hide-footer':
			{
				//setPivotGrid 호출시 설정된 옵션을 전달하므로 옵션세팅
				selComp.setOption({isHideFooter: value});
				if(value) selComp.hideFooter();
				else selComp.showFooter();
			}
			break;
			
			case 'data-selectable':
			{
				pivotGrid = selComp.getPivotGrid();

				if(value) 
				{
					selComp.grid.setAttr(dataKey, value);
					if(pivotGrid) pivotGrid.setAttr(dataKey, value);
				}
				else 
				{
					selComp.grid.removeAttr(dataKey);
					if(pivotGrid) pivotGrid.removeAttr(dataKey);
				}
			}
			break;
		}
	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};

