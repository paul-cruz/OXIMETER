REGISTRY_ID=oximeter_registry
CLOUD_REGION=us-central1

if [ $1 ]; then
    if [ ! -d ./keys/ ];
    then
        mkdir keys
    fi
    cd keys
    echo "Creating keys..."
    mkdir $1
    cd $1

    echo "Creating the self-signed CA certificate..."
    openssl req -x509 -newkey rsa:2048 -days 3650 -keyout rsa_private.pem -nodes -out rsa_cert.pem -subj "/CN=unused"

    echo "Creating Eliptic Curve (EC) private key..."
    openssl ecparam -genkey -name prime256v1 -noout -out ec_private.pem

    echo "Creating Eliptic Curve (EC) public key..."
    openssl ec -in ec_private.pem -pubout -out ec_public.pem

    echo "Creating device..."
    gcloud iot devices create $1 --region $CLOUD_REGION --registry $REGISTRY_ID --public-key path=ec_public.pem,type=es256
    
    echo "Extracting your key pair in $1_extracted.txt ..."
    openssl ec -in ec_private.pem -noout -text > $1_extracted.txt
    
    cd ../../
    echo "Device created!"
else
    echo "ERROR!!!  -  Device name needed!"
fi