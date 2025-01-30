import SingleInvoiceForm from "@/Components/Forms/SingleInvoiceForm";
import { IAdmin } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface Field {
    name: string;
    quantity: string;
}

interface Invoice {
    description: string;
    total: string;
    work_date: string;
    fields: Field[];
}

interface AdminState {
    invoiceDate: string;
    customer_id: string;
    customerInvoices: Invoice[];
}

export const initialState: AdminState = {
    customer_id:"",
    invoiceDate: "",
    customerInvoices: [
        {
            description: "",
            total: "",
            work_date: "",
            fields: [{ name: "", quantity: "" }],
        },
    ],
};

export const adminSlice = createSlice({
    name: "adminDash",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            if (action?.payload && typeof action.payload === "object") {
                state.customerInvoices.push(action.payload);
            } else {
                console.error("Invalid invoice data", action.payload);
            }
        },
        addInvoiceDate: (state, action) => {
              const { date, customer_id } =
                  action.payload;
            state.invoiceDate = date;
            state.customer_id = customer_id;
        },
        removeInvoice: (state, action) => {
            const index = action?.payload;
            if (
                typeof index === "number" &&
                index >= 0 &&
                index < state.customerInvoices.length
            ) {
                state.customerInvoices = state.customerInvoices.filter(
                    (_, i) => i !== index
                );
            } else {
                console.error("Invalid index for removal", index);
            }
        },
        addField: (state, action) => {
            const index = action.payload;

            if (
                typeof index === "number" &&
                index >= 0 &&
                index < state.customerInvoices.length
            ) {
                state.customerInvoices[index].fields.push({
                    name: "",
                    quantity: "",
                });
            } else {
                console.error("Invalid index for adding fields", index);
            }
        },
        removeField: (state, action) => {
            const { invoiceIndex, fieldIndex } = action.payload;

            if (
                typeof invoiceIndex === "number" &&
                invoiceIndex >= 0 &&
                invoiceIndex < state.customerInvoices.length &&
                typeof fieldIndex === "number" &&
                fieldIndex >= 0 &&
                fieldIndex < state.customerInvoices[invoiceIndex].fields.length
            ) {
                state.customerInvoices[invoiceIndex].fields =
                    state.customerInvoices[invoiceIndex].fields.filter(
                        (_, i) => i !== fieldIndex
                    );
            } else {
                console.error(
                    "Invalid indexes for removing field",
                    action.payload
                );
            }
        },
        updateField: (state, action) => {
            const { invoiceIndex, fieldIndex, fieldName, value } =
                action.payload;

            // Validate indexes
            if (
                typeof invoiceIndex === "number" &&
                invoiceIndex >= 0 &&
                invoiceIndex < state.customerInvoices.length &&
                typeof fieldIndex === "number" &&
                fieldIndex >= 0 &&
                fieldIndex < state.customerInvoices[invoiceIndex].fields.length
            ) {
                const invoice = state.customerInvoices[invoiceIndex];
                const field = invoice.fields[fieldIndex];

                if (field && fieldName in field) {
                    field[fieldName] = value;
                } else {
                    console.error("Invalid fieldName:", fieldName);
                }
            } else {
                console.error(
                    "Invalid indexes for updating field",
                    action.payload
                );
            }
        },
        updateDescription: (state, action) => {
            const { invoiceIndex, value } = action.payload;

            // Validate indexes
            if (
                typeof invoiceIndex === "number" &&
                invoiceIndex >= 0 &&
                invoiceIndex < state.customerInvoices.length
            ) {
                state.customerInvoices[invoiceIndex].description = value;
            } else {
                console.error(
                    "Invalid indexes for updating field",
                    action.payload
                );
            }
        },
        updateWorkDate: (state, action) => {
            const { invoiceIndex, value } = action.payload;

            // Validate indexes
            if (
                typeof invoiceIndex === "number" &&
                invoiceIndex >= 0 &&
                invoiceIndex < state.customerInvoices.length
            ) {
                state.customerInvoices[invoiceIndex].work_date = value;
            } else {
                console.error(
                    "Invalid indexes for updating field",
                    action.payload
                );
            }
        },
        updateTotal: (state, action) => {
            const { invoiceIndex, value } = action.payload;

            // Validate indexes
            if (
                typeof invoiceIndex === "number" &&
                invoiceIndex >= 0 &&
                invoiceIndex < state.customerInvoices.length
            ) {
                state.customerInvoices[invoiceIndex].total = value;
            } else {
                console.error(
                    "Invalid indexes for updating field",
                    action.payload
                );
            }
        },
    },
});

export const {
    addInvoice,
    removeInvoice,
    addInvoiceDate,
    addField,
    removeField,
    updateField,
    updateDescription,
    updateWorkDate,
    updateTotal,
} = adminSlice.actions;

export default adminSlice.reducer;
