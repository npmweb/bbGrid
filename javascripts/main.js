$(function(){  
    var models;
    var companies = new Backbone.Collection;
    var MyCollection = new Backbone.Collection;
    var MyGrid = new bbGrid.View({
        container: $('#bbGrid-example'),
        width: 700,
        rows: 25,
        rowList: [25,50, 100, 250, 500],
        collection: MyCollection,
        colModel: [{ title: 'ID', name: 'id', sorttype: 'number' },
                   { title: 'Full Name', name: 'name' },
                   { title: 'Company', name: 'company' },
                   { title: 'Email', name: 'email' }
        ]
    });
    var MyGrid2 = new bbGrid.View({
        container: $('#bbGrid-example2'),
        width: 700,
        rows: 25,
        rowList: [25,50, 100, 250, 500],
        collection: companies,
        subgrid: true,
        subgridAccordion: true,
        colModel: [ { title: 'Company', name: 'company' } ],
        onRowExpanded: function($el, rowid) {                
            var subgridCollection = new Backbone.Collection(MyCollection.where({'company' : companies.at(rowid).get('company')}));
            var subgrid = new bbGrid.View({
                container: $el,
                rows: 10,
                rowList: [10,50,100, 250, 500],
                collection: subgridCollection,                    
                colModel: [ { title: 'Full Name', name: 'name' },
                   { title: 'Age', name: 'age', sorttype: 'number' },
                   { title: 'Address', name: 'address' },
                   { title: 'Email', name: 'email' }
                ]
            });
        }
    });
    MyGrid.toggleLoading(true);
    MyGrid2.toggleLoading(true);
    $.getJSON("example.json", function(json) {
        models = json.result;
        MyCollection.add(models, {silent: true});
        MyCollection.trigger('reset');
        companies.add(_.map(_.uniq(_.pluck(models, 'company')), function(val, index){
            return {
                'id': index, 
                'company': val
            };
        }), {silent: true} );
        companies.trigger('reset');
    });
    
});