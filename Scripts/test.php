<?
// $curl=curl_init();
// $postData=array(
//     "from"=>array(
//         "email"=>"infor@umarket.com.ng",
//         "name"=>"Umarket, Nigeria"
//     ),
//     "to"=>array(
//         "email"=>"enehizenaadriel@gmail.com"
//     ),
//     "text"=>"Hey Adriel!"
// );
// curl_setopt_array($curl,array(
//     CURLOPT_URL=>"https://api.mailersend.com/v1/email",
//     CURLOPT_POST=>true,
//     CURLOPT_RETURNTRANSFER=>TRUE,
//     CURLOPT_HTTPHEADER=>array(
//         'Authorization: Bearer mlsn.5eeb55fd030ea772fceff3ed2e482e11578fd7b69d77f4fc1e4a108e35ec',
//         'Content-Type:application/json'
//     ),
//     CURLOPT_POSTFIELDS=>json_encode($postData)
//     )
// );
// $response=curl_exec($curl);
// // print_r(curl_getinfo($curl));
// echo curl_error($curl);

$curl = curl_init();
$data = array( "api_key" => "TLyreaNtzEFiJFuRZiezqPxfHvjjBuboKdwberlMgLRDhvblTgDwNQeXNnxOgu",
             "message_type" => "NUMERIC",
             "to" => "2349164891120",
             "from" => "N-Alert",
             "channel" => "dnd",
             "pin_attempts" => 10,
             "pin_time_to_live" =>  5,
             "pin_length" => 6,
             "pin_placeholder" => "< 1234 >",
             "message_text" => "Your Umarket signup verification pin is < 1234 >",
             "pin_type" => "NUMERIC");

$post_data = json_encode($data);

curl_setopt_array($curl, array(
 CURLOPT_URL => "https://v3.api.termii.com/api/sms/otp/send",
 CURLOPT_RETURNTRANSFER => true,
 CURLOPT_ENCODING => "",
 CURLOPT_MAXREDIRS => 10,
 CURLOPT_TIMEOUT => 0,
 CURLOPT_FOLLOWLOCATION => true,
 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
 CURLOPT_CUSTOMREQUEST => "POST",
 CURLOPT_POSTFIELDS => $post_data,
 CURLOPT_HTTPHEADER => array(
   "Content-Type: application/json"
 ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
echo curl_error($curl);
?>