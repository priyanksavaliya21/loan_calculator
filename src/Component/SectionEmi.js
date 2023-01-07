import React, { useId } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SectionEmihead } from "./SectionEmihead";
import { BottomText } from "./BottomText";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingCard } from "./Comman/Loading";

import { TotalResultsAction } from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& th , & td": {
    fontWeight: 600,
    fontSize: "15px!important",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const SectionEmi = () => {
  // const Dataid = useId();
  let id = new Date().getTime().toString();
  let nameAttr, ValueAttr;
  const DataX = useSelector((state) => state.layer.TotalResultsBlock);
  const Dispatch = useDispatch();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [Data, setData] = React.useState(null);
  const [value, setvalue] = React.useState({
    TransactionAmount: 1500,
    InterestRates: 1,
    Months: 3,
    User: "",
  });
  const [Total, setTotal] = React.useState({
    EMI: 0,
    totalInterest: 0,
    totalPayment: 0,
    UserName: "Plz Enter Your name",
    Userid: "",
  });
  const getval = (event) => {
    event.preventDefault();
    nameAttr = event.target.name;
    ValueAttr = event.target.value;
    setvalue({ ...value, [nameAttr]: ValueAttr });
  };

  const LoadTable = (TransactionAmount, InterestRates, Months, EMI) => {
    let RemainingBLN_Without_EMI = TransactionAmount;
    let RemainingBLN_Without_PrincipalMonthly = TransactionAmount;
    let MonthlyIntrest, PrincipalMonthly;
    var Array = [];

    for (let i = Months; i >= 1; i--) {
      if (i === Months) {
        RemainingBLN_Without_EMI = TransactionAmount;
      } else {
        RemainingBLN_Without_EMI = RemainingBLN_Without_PrincipalMonthly;
      }
      MonthlyIntrest = ((InterestRates / 12) * RemainingBLN_Without_EMI) / 100;
      PrincipalMonthly = EMI - MonthlyIntrest;
      RemainingBLN_Without_PrincipalMonthly -= PrincipalMonthly;
      Array.push({
        RemainingBLN_Without_EMI: RemainingBLN_Without_EMI,
        RemainingBLN_Without_PrincipalMonthly:
          RemainingBLN_Without_PrincipalMonthly,
        PrincipalMonthly: PrincipalMonthly,
        MonthlyIntrest: MonthlyIntrest,
        RemainingMonths: i,
      });
    }

    return Array;
  };

  const TotalResults = (TransactionAmount, InterestRates, Months, User, id) => {
    let r = parseFloat(InterestRates) / 12 / 100;
    let EMI = Math.round(
      (TransactionAmount * r * Math.pow(1 + r, Months)) /
        (Math.pow(1 + r, Months) - 1)
    );
    let totalInterest = Math.round(EMI * Months - TransactionAmount);
    let totalPayment = Math.round(
      totalInterest + parseFloat(TransactionAmount)
    );

    setTotal({
      EMI: EMI,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      UserName: User,
      Userid: id,
    });
    const LoadTableData = LoadTable(
      TransactionAmount,
      InterestRates,
      Months,
      EMI,
      totalInterest,
      totalPayment
    );
    setData(LoadTableData);
    Dispatch(TotalResultsAction(LoadTableData));
    localStorage.setItem(
      `${User}`,
      JSON.stringify({
        EMI: EMI,
        totalInterest: totalInterest,
        totalPayment: totalPayment,
        UserName: User,
        Userid: id,
        LoadTableData: LoadTableData,
      })
    );
    if (localStorage.getItem(`${User}`)) {
      setOpen1(true);
    } else {
      setOpen2(true);
    }
  };

  const Submit = (event) => {
    event.preventDefault();
    const { TransactionAmount, InterestRates, Months, User } = value;
    TotalResults(TransactionAmount, InterestRates, Months, User, id);
  };
  const handleClose1 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };
  const handleClose2 = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };

  React.useMemo(() => {
    if (DataX.length) {
      console.log(DataX);
    }
  }, [DataX]);

  return (
    <>
      <div className="SectionEmi">
        <Container>
          <SectionEmihead />
          <div className="MainContnent">
            <Row>
              <Col xs={12}>
                <div className="Cardbody">
                  <h1 className="headtext">Enter Your Details</h1>
                  <form onSubmit={Submit}>
                    <TextField
                      sx={{ width: "100% ", marginBottom: "25px" }}
                      required
                      type="text"
                      id="User_name"
                      className="inputstyle"
                      label="User Name"
                      variant="outlined"
                      name="User"
                      value={value.User}
                      onChange={getval}
                    />
                    <TextField
                      sx={{ width: "100% ", marginBottom: "25px" }}
                      required
                      type="number"
                      id="Transaction_Amount"
                      className="inputstyle"
                      label="Transaction Amount"
                      variant="outlined"
                      name="TransactionAmount"
                      value={value.TransactionAmount}
                      onChange={getval}
                    />
                    <TextField
                      sx={{ width: "100% ", marginBottom: "25px" }}
                      required
                      type="number"
                      id="Interest_Rates"
                      className="inputstyle"
                      label="Illustrative Interest Rates (% p.a.)"
                      variant="outlined"
                      name="InterestRates"
                      value={value.InterestRates}
                      onChange={getval}
                    />
                    <FormControl fullWidth sx={{ marginBottom: "45px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Tenure
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        required
                        id="Months"
                        className="inputstyle"
                        label="Age"
                        name="Months"
                        value={value.Months}
                        onChange={getval}
                      >
                        <MenuItem value={3}>3 Months</MenuItem>
                        <MenuItem value={6}>6 Months</MenuItem>
                        <MenuItem value={9}>9 Months</MenuItem>
                        <MenuItem value={12}>12 Months</MenuItem>
                        <MenuItem value={18}>18 Months</MenuItem>
                        <MenuItem value={24}>24 Months</MenuItem>
                      </Select>
                    </FormControl>
                    <button className="button-86">Submit</button>
                  </form>
                </div>
              </Col>
              <Col xs={12}>
                {Data !== null ? (
                  <>
                    <div className="Cardbody">
                      <h2 className="user">
                        {Total.UserName} <br />{" "}
                        {Total.Userid === "" ? null : `Userid ${Total.Userid}`}
                      </h2>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 700 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Installment No</StyledTableCell>
                              <StyledTableCell>
                                Remaining Months
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                Principal outstanding At beginning
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                EMI
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                Interest ON outstanding Principal
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                Principal Paymemt
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                Principal outstanding At End
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Data.map((row, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                  {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                  {row.RemainingMonths}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {Math.round(row.RemainingBLN_Without_EMI)}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {Total.EMI}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {Math.round(row.MonthlyIntrest)}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {Math.round(row.PrincipalMonthly)}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {Math.round(
                                    row.RemainingBLN_Without_PrincipalMonthly
                                  )}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="Total_Results">
                        <h3>
                          <p>{`Monthly EMI`}</p>
                          <p>{`${Total.EMI}`} &#x20b9;</p>
                        </h3>
                        <h3>
                          <p>{`Total Interest Amount`}</p>
                          <p>{`${Total.totalInterest}`} &#x20b9;</p>
                        </h3>
                        <h3>
                          <p>{`Total Amount Payable`}</p>
                          <p>{`${Total.totalPayment}`} &#x20b9;</p>
                        </h3>
                      </div>
                    </div>
                  </>
                ) : (
                  <LoadingCard />
                )}
              </Col>
            </Row>
          </div>
          <BottomText />
        </Container>
      </div>

      <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: "100%" }}>
          Your EMI information successfully Store at localStorage in Web browser
          And also At Redux Store .
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={5000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
          Your EMI information is not Store at localStorage in Web browser And
          also At Redux Store !! ..
        </Alert>
      </Snackbar>
    </>
  );
};
