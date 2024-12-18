
/**
Constructor
Do not call Function in Constructor.
*/
AListViewAttrProp = class AListViewAttrProp extends BaseProp
{
    constructor()
    {
        super()
		
	
		this.attrPath = BaseProp.ATTR_PATH + 'AListView/';
		
		this.itemId = 0;
	
	

    }
}



AListViewAttrProp.prototype.init = function(context, evtListener)
{
	BaseProp.prototype.init.call(this, context, evtListener);
	
	this.acc.insertItem('Item', this.attrPath+'Item.lay');
	this.acc.insertItem('Contents', this.attrPath+'Contents.lay');
	this.acc.insertItem('Option', this.attrPath+'Option.lay');

	this.itemInfoGrid = this.findCompByClass('AGrid_')[0];

	//common
	this.insertCommonAttr();
};


AListViewAttrProp.prototype.getItemId = function()
{
	//return 'i'+this.itemId++;
	
	var time = Date.now() + '';
	
	return time.substr(time.length-6, 6);
};


AListViewAttrProp.prototype.applyValueToSelComp = function(selComp, dataKey, valGroup, value)
{
	if(valGroup=='ATTR_VALUE')
	{
		/*
		if(dataKey=='data-style-selectitem')
		{
			var preVal = selComp.$ele.attr(dataKey);
			this.applyStyleValue(dataKey, value, selComp.$ele, selComp.$ele.find('.AListView-select'));
			return preVal;
		}
		*/
	}
	else if(valGroup=='CSS_VALUE')
	{
		if(dataKey=='item-height')
		{
			var $items = selComp.$ele.children(),
				preVal = $items.get(0).style['height'];
				
			$items.each(function()
			{
				this.style['height'] = value;
			});
			
			return preVal;
		}
	}
	
	return BaseProp.prototype.applyValueToSelComp.call(this, selComp, dataKey, valGroup, value);
};



AListViewAttrProp.prototype.getUpdateValue = function(selComp, dataKey, groupName)
{
	//단일 선택인 경우만 값을 읽어와 셋팅한다. 다중 선택인 경우는 값을 클리어 해준다.
	if(this.selCompArr.length==1)
	{
		if(groupName=='CSS_VALUE')
		{
			if(dataKey=='item-height')
			{
				var $items = selComp.$ele.children();
				return $items.get(0).style['height'];
			}
		}
	}

	return BaseProp.prototype.getUpdateValue.call(this, selComp, dataKey, groupName);	
};

AListViewAttrProp.prototype.updateAGrid_ = function(dataKey, valueComp, value)
{
	var row, arr = [], dataArr = [], tmp, key, inx,
		selComp = this.selCompArr[0];

	valueComp.removeAll();
	
	//key is attr key
	for(key in value)
	{
		tmp = value[key].split(',');	//index, url, itemId
		
		inx = Number(tmp[0]);
		arr[inx] = tmp[1];
		dataArr[inx] = tmp[2];
	}

	for(inx in arr)
	{
		row = valueComp.addRow([ arr[inx] ]);
		valueComp.setCellData(row, 0, dataArr[inx]);
		
		this.applyUrlToItem(selComp, inx, arr[inx]);
	}
	
	//--------------------------------------------------

	//각 셀에 풍선말을 단다.
	var rows = valueComp.getRows();
	rows.each(function()
	{
		$(this).children().each(function()
		{
			$(this).attr('title', this.textContent);
		});
	});
	
};

AListViewAttrProp.prototype.openUrlInputDlg = function(comp, title, inputText)
{
	var wnd = new AFrameWnd_('UrlInputDlg'),
		ofs = comp.get$ele().offset(),
		w = 240, compH = comp.getHeight();
		
	wnd.setWindowOption(
	{
		isModal: true,
		isFocusLostClose: true,
		modalBgOption: 'none',
	});
	
	if(ofs.left+190 > $(window).width()) ofs.left = $(window).width() - w - 5;
	
	wnd.open('Source/popup/InputDlg.lay', null, ofs.left, ofs.top+compH, w, '174px');

	var view = wnd.getView();
	wnd.setTitleText(title);
	view.expLabel = '아이템 경로를 입력해 주세요.';
	view.nameLabel = 'URL';
	view.inputTxt = inputText;

	return wnd;
};

AListViewAttrProp.prototype.onAddItemBtnClick = function(comp, info, e)
{
	var wnd = this.openUrlInputDlg(comp, 'Add Item', ''), thisObj = this;

	wnd.setResultCallback(function(result, data)
	{
		if(result==0 && data)
		{
			var listView = thisObj.selCompArr[0],
				rowCount = thisObj.itemInfoGrid.getRowCount();
		
			//최초 추가하는 경우, 기존의 스타일을 보여주기위해 추가되어 있던 row 를 삭제한다. listview-row
			if(rowCount==0)
			{
				listView.$ele.find('.listview-row').remove();
			}
			
			listView.$ele.append('<div class="listview-row"></div>');
			var row = thisObj.itemInfoGrid.addRow([ data ]);
			
			//자동으로 증가하는 값으로 새로 추가된 아이템의 고유아이디를 만든다.
			thisObj.itemInfoGrid.setCellData(row, 0, thisObj.getItemId());
			
			thisObj.applyGridChange();
		}
	});
	
};

AListViewAttrProp.prototype.onEditItemBtnClick = function(comp, info, e)
{
	if(this.itemInfoGrid.getSelectedCells().length == 0) return;

	var row = this.itemInfoGrid.getSelectedCells()[0];
	var url = this.itemInfoGrid.getCellText(row, 0);

	var wnd = this.openUrlInputDlg(comp, 'Edit Item', url), 
		thisObj = this;
	
	wnd.setResultCallback(function(result, data)
	{
		if(result == 0 && data)
		{
			thisObj.itemInfoGrid.setCellText(row, 0, data);
			thisObj.applyGridChange();
		}
	});
};

AListViewAttrProp.prototype.onDeleteItemBtnClick = function(comp, info, e)
{
	var selRows = this.itemInfoGrid.getSelectedCells(),
		row = selRows[0];

	if(selRows.length>0) 
	{
		var listView = this.selCompArr[0],
			selIndex = this.itemInfoGrid.indexOfRow(row);
			
		listView.$ele.find('.listview-row').eq(selIndex).remove();
	
		this.itemInfoGrid.clearSelected();
		this.itemInfoGrid.removeRow(row);
		
		var rowCount = this.itemInfoGrid.getRowCount();
		//정적으로 추가했던 모든 로우가 제거되면 원래 있던 기본 태그를 복원해 준다.
		if(rowCount==0)
		{
			//style="height: 60px;" --> attribute 에서 정보를 참조하기 위해 필요
			
			listView.$ele.append('<div class="listview-row" style="height: 60px;"></div><div class="listview-row AListView-select" style="height: 60px;"></div>\
<div class="listview-row" style="height: 60px;"></div><div class="listview-row" style="height: 60px;"></div>');
		}
		
		this.applyGridChange();
	}
};

AListViewAttrProp.prototype.onMoveBtnClick = function(comp, info, e)
{
	if(this.itemInfoGrid.getSelectedCells().length == 0) return;
	
	var move;
	if(comp.compId =="UP") move = -1;
	else if(comp.compId =="DOWN") move = 1;
	
	var selRow = this.itemInfoGrid.getSelectedCells()[0];
	var selIndex = this.itemInfoGrid.indexOfRow(selRow);
	var selText = this.itemInfoGrid.getCellText(selRow, 0);
	var selData = this.itemInfoGrid.getCellData(selRow, 0);
	
	if(selIndex+move == -1) return;
	
	var moveRow = this.itemInfoGrid.getRow(selIndex+move);
	if(!moveRow) return;
	
	var text = this.itemInfoGrid.getCellText(moveRow, 0);
	var data = this.itemInfoGrid.getCellData(moveRow, 0);
	
	this.itemInfoGrid.setCellText(selRow, 0, text);
	this.itemInfoGrid.setCellData(selRow, 0, data);
	
	this.itemInfoGrid.setCellText(moveRow, 0, selText);
	this.itemInfoGrid.setCellData(moveRow, 0, selData);
	
	this.itemInfoGrid.selectCell(moveRow, false);
	
	this.applyGridChange();
};

AListViewAttrProp.prototype.applyGridChange = function()
{
	var value = {}, $rows = this.itemInfoGrid.getRows(), 
		selComp = this.selCompArr[0], url, data, thisObj = this;

	$rows.each(function(rowIndex)
	{
		url = thisObj.itemInfoGrid.getCellText(this, 0);
		data = thisObj.itemInfoGrid.getCellData(this, 0);	//고유 아이디
		
		value[data] = [ rowIndex, url, data ];
		
		thisObj.applyUrlToItem(selComp, rowIndex, url);
	});

	this.applyValue(this.itemInfoGrid, value);
};


AListViewAttrProp.prototype.onIteminfoDblClick = function(comp, info, e)
{
	var prjView = theApp.getProjectView(),
		selRow 	= comp.getSelectedCells()[0],
		url 	= comp.getCellText(selRow, 0);
		
	var item = prjView.findProjectItemByTreePath(url);
	
	if(item)
	{
		theApp.openDocTmplFile(prjView.getFullPath(item));
	}
};

AListViewAttrProp.prototype.onIteminfoSelect = function(comp, info, e)
{
	var selComp = this.selCompArr[0],
		selRow 	= comp.getSelectedCells()[0],
		selInx	= comp.indexOfRow(selRow),
		url 	= comp.getCellText(selRow, 0);
		
	this.applyUrlToItem(selComp, selInx, url);
};

AListViewAttrProp.prototype.applyUrlToItem = function(listView, inx, url)
{
	var prjView = theApp.getProjectView(),
		item = prjView.findProjectItemByTreePath(url);
	
	if(item)
	{
		url = prjView.getFullPath(item);
		
		var $listItem = listView.$ele.find('.listview-row').eq(inx);
		
		if(AUtil_.extractExtName(url) != 'lay')
		{
			$listItem.children().remove();
			return;
		}
		
		var html = afc_.getFileSrc(url);
		if(html)
		{
			$listItem.children().remove();
			$listItem.append(html);
			
			$listItem.find('.RGrid-Style').removeAttr('id').css('border', '1px solid blue').text('rMate Grid').css('text-align','center');
			$listItem.find('.RChart-Style').removeAttr('id').css('border', '1px solid yellow').text('rMate Chart').css('text-align','center');
			
			$listItem.children().css('position', 'relative');
		}
	}

};