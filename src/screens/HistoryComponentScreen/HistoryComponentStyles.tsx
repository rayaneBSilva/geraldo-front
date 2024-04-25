import { StyleSheet } from "react-native";

export const historyComponentStyles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginTop: 50,
    borderRadius: 40,
    backgroundColor: "rgba(19, 22, 75, 0.5)",
  },
  textHistory: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 30,
  },
  modalContent: {
    marginTop: 22,
    maxHeight: "80%",
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    padding: 10,
    marginRight: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "white",
  },
  historyItem: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#13164B",
  },
  icon: {
    marginRight: 10,
  },
  detailsContainer: {
    padding: 5,
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
  value: {
    color: "white",
  },
  backgroundBlue: {
    backgroundColor: "#1F1546",
  },
});
