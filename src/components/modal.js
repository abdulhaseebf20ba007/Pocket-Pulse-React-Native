import React, { useState } from "react";
import { Button, View, TextInput, Text } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { icons , COLORS} from "../constants";
function ModalTester({ isVisible, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("credit");
  const [Expensecategory, setExpenseCategory] = useState("");
  const categories = [
    { name: "Utilities",
    icon: icons.education, },
    { name: "Entertainment",
    icon: icons.food, },
    {name: "Travel",
    icon: icons.baby_car, },
    { name: "HealthCare",
    icon: icons.healthcare, },
    { name: "Financial",
    icon: icons.sports_icon, },
    {name: "Others",
    icon: icons.cloth_icon, },
  ];

  const handleAddExpense = async () => {
    try {
      if (!selectedOption) {
        console.log("Please select Credit or Debit.");
        return; // Exit the function early if no option is selected
      }
  
      if (!expenseAmount) {
        console.log("Please provide the expense amount.");
        return; // Exit the function early if no expense amount is provided
      }
  
      const expense = {
        amount: expenseAmount,
        Expensecategory: Expensecategory,
        category: selectedOption, // Include the selected option (Credit/Debit)
      };
  
      const existingExpenses = await AsyncStorage.getItem("expenses");
      const expenses = existingExpenses ? JSON.parse(existingExpenses) : [];
  
      expenses.push(expense);
  
      await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  
      console.log("Expense added:", expense);
  
      onClose();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '85%', height: '60%', backgroundColor: '#fff', padding: 15 }}>
          <SelectList setSelected={setExpenseCategory} data={categories.map(Expensecategory => Expensecategory.name)} placeholder={"Select Category"} />

          <TextInput
            placeholder="Expense Amount"
            value={expenseAmount}
            onChangeText={text => setExpenseAmount(text)}
            keyboardType="numeric"
            style={{ marginBottom: 10, borderBottomWidth: 1 }}
          />

          <View style={{ justifyContent: 'flex-end' }}>
            <Button title="Add Expense" onPress={handleAddExpense} color={COLORS.peach} />
            <Button title="Cancel" onPress={onClose} color={COLORS.purple} />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="credit"
                status={selectedOption === "credit" ? "checked" : "unchecked"}
                onPress={() => setSelectedOption("credit")}
              />
              <Text>Credit</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                value="debit"
                status={selectedOption === "debit" ? "checked" : "unchecked"}
                onPress={() => setSelectedOption("debit")}
              />
              <Text>Debit</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalTester;
