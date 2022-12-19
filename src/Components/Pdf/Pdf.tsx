import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import {FC, ReactElement, useState} from "react";
// @ts-ignore
import logo from "../../Assets/Images/renmar.png"

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        color: "black",
    },
    heading: {
        fontSize: "13px"
    },
    text: {
        fontSize: "10px"
    },
    logo: {
        height: "100px",
        width: "125px",
        left: "450px",
        top: "10px",
        position: "absolute"
    },
    quoteInfo: {
        margin: 43,
        fontSize: "10px",

        date: {
            paddingBottom: "10px"
        },
    },
    main: {
        marginLeft: 70,
        marginRight: 70
    },
    activity: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: "7px"
    },
    viewer: {
        width: "100%",
        height: "90vh",
    },
});

interface Props {
    projectName: string;
    client: {
        name: string;
        streetName: string;
        town: string;
        postcode: string
    };
    description: string;
    activities: {name: string; price: number}[];
    exclusions: string[];
    requirements: string[];
}

const Pdf: FC<Props> = (props: Props): ReactElement => {

    const getTotalPrice = (): string => {
        return props.activities.reduce(((acc, item) => acc + item.price), 0).toFixed(2)
    }

    return (
        // <PDFViewer style={styles.viewer} showToolbar={true}>
            <Document>
                <Page size="A4" style={styles.page} wrap={true}>
                    <Image
                        style={styles.logo}
                        src={logo}
                    />

                    <View style={styles.quoteInfo}>
                        <Text style={styles.quoteInfo.date}>Date: 20/10/2022</Text>
                        <Text style={{paddingBottom: "2px"}}>Quote Reference: 123910319</Text>
                        <Text style={{paddingBottom: "2px"}}>Project: {props.projectName}</Text>
                        <Text style={{paddingBottom: "2px"}}>Address: {props.client.streetName} {props.client.town} {props.client.postcode.toUpperCase()}</Text>
                        <Text style={{paddingBottom: "2px"}}>Client: {props.client.name}</Text>
                    </View>

                    <View style={styles.main}>
                        <Text style={styles.heading}>Nature Of Works</Text>
                        <Text style={{marginBottom: "15px"}} />
                        <Text style={styles.text}>{props.description}</Text>
                        <Text style={{marginBottom: "10px"}} />
                        <Text style={{fontSize: "10px", fontWeight: 900}}>Proposed contract price ex VAT: £{getTotalPrice()}</Text>


                        <Text style={{marginBottom: "15px"}} />
                        <Text style={styles.heading}>Main Activities</Text>
                        <Text style={{marginBottom: "15px"}} />
                    </View>

                    {props.activities.map((activity: any) => (
                        <View style={styles.activity}>
                            <Text style={{...styles.main, ...styles.text, width: "220px"}}>{activity.name}</Text>
                            <Text style={{...styles.main, ...styles.text}}>£{activity.price.toFixed(2)}</Text>
                        </View>
                    ))}

                    <View style={styles.main}>
                        <Text style={{marginBottom: "15px"}} />
                        <Text style={styles.heading}>Project Specifics</Text>
                        <Text style={{marginBottom: "15px"}} />

                        {props.requirements.map((requirement: any) => (
                        <Text style={{...styles.text, marginBottom: "2px"}}>{requirement}</Text>
                        ))}
                    </View>

                    <View style={styles.main}>
                        <Text style={{marginBottom: "15px"}} />
                        <Text style={styles.heading}>Exclusions</Text>
                        <Text style={{marginBottom: "15px"}} />

                        {props.exclusions.map((exclusion: any) => (
                            <Text style={{...styles.text, marginBottom: "4px"}}>{exclusion}</Text>
                        ))}
                    </View>
                </Page>
            </Document>
        // </PDFViewer>
    );
}
export default Pdf;
