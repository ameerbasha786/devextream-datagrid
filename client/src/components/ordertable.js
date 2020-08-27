import React,{Component} from 'react';

import DataGrid, {
    Column,
    Pager,
    Paging,
    SearchPanel,
    Editing,
    RequiredRule,
    EmailRule,
    PatternRule,
    Popup
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import Axios from 'axios';
import ScrollView from 'devextreme-react/scroll-view';

const pageSizes = [10, 25, 50, 100];

class Ordersdetails extends Component {
    state = {
        orders: new CustomStore({
            key: '_id',
            load: () => this.sendRequest("/tabledetails"),
            insert: (values) => this.sendRequest(`/tabledetails`, 'POST', {
                values
            }),
            update: (key, values) => this.sendRequest(`/tabledetails/${key}`, 'PUT', {
                values
            }),
            remove: (key) => this.sendRequest(`/tabledetails/${key}`, 'DELETE', {
                key: key
            })
        }),
        
        loading: false,
        selectedOrder: null,
        popUpVisible: false
    }

    sendRequest = async (url, method = 'GET', data = {}) => {
        try {
            if (method === "GET") {
                const response = await Axios({
                    method,
                    url
                });
                return response.data ? response.data : [];
            }
            const response = await Axios({
                method,
                url,
                data: data.values
             })
            return response.data ? response.data : [];

        } catch (err) {
            if (err.response.data && Array.isArray(err.response.data.error)) {
                throw err.response.data && err.response.data.error.map(e => e.Message);
            } else {
                throw err.response.data.error;
            }
        }
    } 

    onSelectRow = ({ selectedRowsData }) => {
        this.setState({ selectedOrder: selectedRowsData[0], popupVisible: true })
    }

    hideOrder = () => this.setState({ selectedOrder: {}, popupVisible: false })

    render() {
        const { orders } = this.state;
        return (
            <section className="section">
                <h1>Jazeera-Orders</h1>
                <DataGrid
                    selection={{ mode: 'single' }}
                    id="grid"
                    dataSource={orders}
                    allowColumnReordering={true}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    rowAlternationEnabled={true}
                    allowColumnResizing={true}
                    columnResizingMode="widget"
                    onSelectionChanged={this.onSelectRow}
                >
                    <SearchPanel width={300} visible={true} highlightCaseSensitive={true} />
                    <Editing
                        refreshMode="reshape"
                        mode="popup"
                        allowAdding={true}
                        allowDeleting={true}
                        allowUpdating={true}
                    >
                        <Popup dragEnabled={false} title="OrderDetails" showTitle={true} width={700} height={430}>
                            <ScrollView></ScrollView>
                        </Popup>
                    </Editing>
                    <Column width={125} dataField="firstname" caption="First Name" dataType="string">
                        <RequiredRule />
                    </Column>
                    <Column width={125} dataField="lastname" dataType="string" caption="Last Name">
                        <RequiredRule />
                    </Column>
                    <Column width={200} dataField="email" dataType="string" caption="Email" >
                        <RequiredRule />
                        <EmailRule />
                    </Column>
                    <Column width={125} dataField="phone" dataType="number" caption="Phone">
                        <RequiredRule />
                        <PatternRule message="Please enter 10 digits mobile number" pattern={"^[0-9]{10}$"} />
                    </Column>
                    <Column width={125} dataField="feedback" dataType="string" caption="feedback">
                        <RequiredRule />
                    </Column>
                    <Column width={125} dataField="ordername" dataType="string" caption="Order Name">
                        <RequiredRule />
                    </Column>
                    <Column width={125} dataField="category" dataType="string" caption="Category">
                        <RequiredRule />
                        
                    </Column>
                    <Column width={100} dataField="price" dataType="number" caption="Price" format={{ style: "currency", currency: "INR", useGrouping: true }}  >
                        <RequiredRule />
                    </Column>
                    <Column width={75} dataField="orderstatus" dataType="string" caption="OrderStatus">
                        <RequiredRule />
                        
                    </Column>
                    <Column width={100} dataField="paymentmethod" dataType="string" caption="Payment Method">
                        <RequiredRule />
                        
                    </Column>
                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
                    <Paging defaultPageSize={10} />
                </DataGrid>
            </section>
        );
    }
}

export default Ordersdetails;
