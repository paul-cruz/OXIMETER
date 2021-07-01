#define SECRET_SSID "WIFI_SSID"
#define SECRET_PASS "WIFI_PASSWORD"

// Cloud iot details.
const char* project_id = "your-project-id";
const char* location = "your-project-location";
const char* registry_id = "your-cloud-iot-registry-id";
const char* device_id = "your-cloud-iot-device-id";

const char* private_key_str =
    "private_key_str-first-line"
    "private_key_str-second-line"
    "private_key_str-third-line";

// Time (seconds) to expire token += 20 minutes for drift
const int jwt_exp_secs = 3600; // Maximum 24H (3600*24)

// In case we ever need extra topics
const int ex_num_topics = 0;
const char* ex_topics[ex_num_topics];
//const int ex_num_topics = 1;
//const char* ex_topics[ex_num_topics] = {
//  "/devices/my-device/tbd/#"
//};