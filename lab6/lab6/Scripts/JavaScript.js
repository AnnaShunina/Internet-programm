﻿function Note(name, content)
{
    var self = this;
    self.Name = name;
    self.Content = content;
  /*  self.selectnote = function (bool) {
        return bool;
    };*/
}
/*
Note.prototype.updateTo = function (newKey, newValue) {
    this.Key = newKey;
    this.Value = newValue;
};*/

var AppViewModel = function () {
    var self = this;
    self.notepads = ko.observableArray([]);
    self.visible = 0;
    self.message = ko.observable('');
    self.Name = ko.observable('');
    self.Content = ko.observable('');
    self.currentnotepad = ko.observable(new Note("",""));
    self.selectedNote = ko.observable('');
    self.addItem = function ()
    {
        if (self.Name() != "") {
            self.currentnotepad = ko.observable(new Note(self.Name(),self.Content()));
            var data = ko.toJSON(self.currentnotepad);
            $.post("/Home/Save", {note:data}, function (returnedData) {  
                self.notepads.push(self.currentnotepad);
                self.currentnotepad().Name = ko.observable('');
                self.currentnotepad().Content = ko.observable('');
                self.message('<strong>Well done!</strong>You successfully create');
                self.visible = 1;
            })
            //$.ajax({
            //    type: 'POST',
            //    url: '/Home/Save',
            //    data: { note: data },
            //    success: function (returnedData) {
            //        alert(returnedData.message);
            //    }
            //});
            //ko.utils.postJson('Home/Save', {note:data});
        }
    }
    self.saveItem = function ()
    {
        console.log(self.currentnotepad().Name());
        //self.notepads[self.currentnotepad().Name()] = self.currentnotepad().Content();
        // server
    }
    self.removeItem = function ()
    {
        self.notepads.remove(self.currentnotepad);
    }
    self.selectnote = function (data, element, lab) {
        if (lab == null) { var label = $(element.target).text(); }
        else { var label = lab; }
        self.selectedNote(label);
        $(element.target).parent().children().removeClass('active');
        $(element.target).addClass('active');
    };

}

ko.applyBindings(AppViewModel);

