@props([
    'data' => [],
])

<div class="datatable bg-gray-100 col-span-2 rounded-md p-1">
    <div x-data="{ total_data_length: {{ count($data) }},
                    max_visible_entries: 10
                }">
        <div class="flex flex-col sm:flex-row items-center p-2">
            <div class="entries">
                Show
                <select class="max_visible_entries border-2 rounded-md outline-none" name="" id=""
                    x-model="max_visible_entries">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
            </div>
            <div class="relative ml-auto mr-2 p-2" x-data="{ search: '' }">
                Search: <input type="text" x-model="search" x-ref="searchInput"
                    class="border-2 rounded-md outline-none px-1 search_box" /> <span
                    class="fa-solid fa-close absolute right-3 top-1/2 -translate-y-1/2" x-show="search!==''"
                    @click="search='';$refs.searchInput.value='';$refs.searchInput.focus();"></span>
            </div>
        </div>
        <div class="w-full flex flex-row">
            <div class="ml-auto mr-2 flex justify-end">
                <div class="cursor-pointer move_left text-gray-200 bg-gray-900 rounded-md py-2 px-10 mx-1 ">
                    <span class="fa-solid fa-angle-left"></span>
                    <span>previous</span>
                </div>
                <div class="cursor-pointer move_right text-gray-200 bg-gray-900 rounded-md py-2 px-10 mx-1">
                    <span>Next</span>
                    <span class="fa-solid fa-angle-right"></span>
                </div>
            </div>
        </div>
        <div class="h-60 sm:h-96 overflow-scroll">
            {{ $slot }}
        </div>
        <div class="text-sm pl-2 text-gray-600 m-2">
            @if (!empty($data))
                Showing <span class="data_from">1</span> to <span
                    class="data_to">{{ (int) (count($data) / 10) == 0 ? (int) count($data->take(3)) : 10 }}</span> of <span
                    class="total_entries">{{ count($data) }}</span> entries
            @endif
        </div>
    </div>
    <div></div>
</div>
