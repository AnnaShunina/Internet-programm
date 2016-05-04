function Note()
{
    var self = this;
    self.Name = ko.observable('');
    self.Content = ko.observable('');
}

var AppViewModel = function () {
    var self = this;
    self.notepads = ko.observableArray();
    self.visible = ko.observable(0);
    self.message = ko.observable('');
    self.currentnotepad = ko.observable(new Note());
    self.addItem = function ()
    {
        if (self.currentnotepad().Name() != "") {
            var data = ko.toJSON(self.currentnotepad);
            $.post("/Home/Save", {note:data}, function (returnedData) {
                // This callback is executed if the post was successful     
                self.notepads.push(self.currentnotepad);
                self.currentnotepad().Name = ko.observable('');
                self.currentnotepad().Content = ko.observable('');
                self.message('<strong>Well done!</strong>You successfully create');
                self.visible(1);
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

    }
    self.removeItem = function ()
    {
        self.notepads.remove(self.currentnotepad);
    }
}

ko.applyBindings(AppViewModel);

