import $ from 'jquery';

const DataTable = {

    max_visible_entries : ["10", "20", "50", "100"],

    init(){
        $(".datatable").each(function(){
            let data_table = $(this);
            if(!data_table.data('initialized')){
                DataTable.bind(data_table);
                data_table.data('initialized',true);

            }
        });
    },

    bind(wrapper){
        var compact_batches = [];
        let table_row = wrapper.find("tbody tr").clone();
        let filtered_users = [];

        wrapper.find('.search_box').on('input focus',function(){
            DataTable.batch_control(wrapper, compact_batches, filtered_users, table_row,this);
        }
        );

        wrapper.find('.max_visible_entries').on("change", function(){
            wrapper.find('.search_box').val('');
            DataTable.make_batches(wrapper,compact_batches, filtered_users, table_row);
        });

        wrapper.find(".move_left").on('click', function () {
            let left_button = wrapper.find(".move_left") ;
            let right_button = wrapper.find(".move_right") ;

            right_button.show();
            wrapper.find("tbody tr").hide();
            wrapper.find('tbody tr[batch="' + $(this).attr("batch") + '"]').show();

            right_button.attr("batch", parseInt($(this).attr("batch"), 10) + 1);
            left_button.attr("batch", parseInt($(this).attr("batch"), 10) - 1);

            if ($(this).attr("batch") <0) {
                left_button.hide();
            }
            DataTable.refresh_datatable_footer(wrapper, filtered_users);
            }
        );
        wrapper.find(".move_right").on('click', function () {
            let left_button = wrapper.find(".move_left") ;
            let right_button = wrapper.find(".move_right") ;

            left_button.show();
            wrapper.find("tbody tr").hide();
            wrapper.find('tbody tr[batch="' + $(this).attr("batch") + '"]').show();

            left_button.attr("batch", parseInt($(this).attr("batch"), 10) - 1);
            right_button.attr("batch", parseInt($(this).attr("batch"), 10) + 1);

            if ($(this).attr("batch") >= compact_batches.length) {
                right_button.hide();
            }
            DataTable.refresh_datatable_footer(wrapper, filtered_users);
        });
        DataTable.make_batches(wrapper,compact_batches, filtered_users, table_row);
    },
    batch_control(wrapper, compact_batches, filtered_users, table_row, search_box){
        if ( this.max_visible_entries.includes( wrapper.find(".max_visible_entries").val() )) {
            if($(search_box).val()!=""){
                DataTable.make_batches(wrapper, compact_batches, filtered_users, table_row, $(search_box).val());
            }else{
                DataTable.make_batches(wrapper,compact_batches, filtered_users, table_row);
            }
        }
        console.log(compact_batches);
    },
    make_batches(wrapper, compact_batches, filtered_users, table_row, with_search = null){
        compact_batches.length = 0;
        filtered_users.length = 0;

        wrapper.find("tbody tr").remove();
        if(with_search!=null){
            table_row.each(function(index,tr_){
                if($(tr_).find('td:not(.exempt)').text().toLowerCase().includes(with_search.toLowerCase()))
                    filtered_users.push(tr_);
            });
        }else{
            table_row.each(function(index,value){
                filtered_users.push(value);
            })
        }
        $.each(filtered_users, function (index, value) {
            let batch = (index / wrapper.find(".max_visible_entries").val() ) | 0;
            if (!compact_batches[batch]) {
                compact_batches[batch] = [];
            }
            compact_batches[batch].push(value);
        });
        wrapper.find(".move_left").hide();
        wrapper.find(".move_right").hide();
        if (compact_batches.length > 1) {
            wrapper.find(".move_right").show().attr("batch", 1);
        } else if(compact_batches.length<1) {
            wrapper.find('tbody').append(
                $("<tr>").append(
                    $("<td>")
                        .addClass(
                            "border-2 border-gray-200 p-1 text-center bg-gray-300"
                        )
                        .attr({ colspan: "4" })
                        .text("No data !")
                )
            );
            return;
        }
        if (compact_batches) {
            $.each(compact_batches, function (batchIndex, batch) {
                $.each(batch, function (itemIndex, data_item) {
                    $(data_item).attr({ batch: batchIndex })
                    wrapper.find('tbody').append($(data_item));
                });
            });
        }
        wrapper.find("tbody tr").hide();
        wrapper.find('tbody tr[batch="0"]').show();
        DataTable.refresh_datatable_footer(wrapper, filtered_users);
    },
    refresh_datatable_footer(wrapper, filtered_users){
        if(filtered_users){
            wrapper.find('.data_from').text(wrapper.find('tbody tr:visible').attr('batch') * wrapper.find('.max_visible_entries').val()+1);
            wrapper.find('.data_to').text(wrapper.find('tbody tr:visible').attr('batch') * wrapper.find('.max_visible_entries').val()+wrapper.find('tbody tr:visible').length);
            wrapper.find('.total_entries').text(filtered_users.length);
        }else{
            wrapper.find('.data_from').text("0");
            wrapper.find('.data_to').text("0");
            wrapper.find('.total_entries').text("0");
        }
    },

}
export default DataTable;