import React, { useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";
import { Button2 } from "../button/Button2";
import { Modal } from "../modal/Modal";
import ServiceBase from "../../services/ServiceBase";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import Config from "../../utils/Config";
import { formatDateBack } from "../../screens/DriverRegisterForm/DriverRegisterValidation";

interface npsDialog {
    isVisible: boolean
    onClose: () => void
    idEstabelecimento: string
    token: string
}

const NpsDialog: React.FC<npsDialog> = ({ isVisible, onClose, idEstabelecimento, token }) => {
    const [score, setScore] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState("");
    const serviceBaseInstance = new ServiceBase();

    const handleSignUp = async () => {
        if (score !== null) {
            try {
                const response = await axios.post(`${Config.API_URL}/rate/${idEstabelecimento}`, { comment: comment, grade: score, date:   formatDateBack(new Date().toDateString())}, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                console.log("Resposta da API:", response.data);
                onClose(); 
              } catch (error: any) {
                if (error.response) {
                  setErrorMessage(error.response.data.message);
                  console.error("Erro ao responder NPS:", error.response.data);
                } else if (error.request) {
                  console.error("Não foi recebida resposta do servidor:", error.request);
                } else {
                  console.error("Erro ao enviar requisição:", error.message);
                }
              }
            clearClose()
        }
    };

    const handleRating = (rating: number) => {
        setScore(rating);
    };

    const handleCommentChange = (text: string) => {
        setComment(text);
    };

    const clearClose = () => {
        onClose();
        setScore(null);
        setComment("")
    };

    

    return (
        <Modal isVisible={isVisible}>
            <Modal.Container>
                <View style={styles.modal}>
                    <Modal.Header title="Quanto você recomenda este estabelecimento?" />
                    <Modal.Body>
                        <View style={styles.ratingContainer}>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    style={[styles.ratingButton, score === num ? styles.selected : null]}
                                    onPress={() => handleRating(num)}
                                >
                                    <Text style={styles.ratingText}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Deixe um comentário (opcional)"
                            onChangeText={handleCommentChange}
                            value={comment}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <View style={styles.center}>
                            <Button2 title="Enviar" onPress={handleSignUp} />
                            <TouchableOpacity onPress={clearClose}>
                                <Text style={styles.textButton}>
                                    {"Deixar para depois"}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal.Footer>
                </View>
            </Modal.Container>
        </Modal>
    );
};

const styles = StyleSheet.create({
    commentInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    ratingText: {
        fontSize: 16,
        color: '#333',
    },
    selected: {
        backgroundColor: '#007bff',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ratingButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        paddingTop: 10,
        paddingVertical: 20,
    },
    textButton: {
        fontSize: 13,
        fontWeight: "400",
        textAlign: "center",
        paddingTop: 15,
        paddingVertical: 20,
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 15,
        paddingVertical: 15,
        borderRadius: 15,
        width: 50,
        height: 40,
        alignItems: "center",
    },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        width: "80%",
        borderBottomWidth: 2,
    },
    modal: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
    },
});

export default NpsDialog;
