using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
//	Component halo;
	Transform pill;
	BottleCapTouchListener script;

    bool shake;
	bool statusTracked;
	public static bool isClicked = false;
	private GameObject arrow;
	private GameObject interactable;
	private GameObject textToTap;

	bool isFlickering = true;
	float jumpUpTime = 1.5f;
	float jumpDownTime = 1.5f;
	float jumpUpTimeCounter;
	float jumpDownTimeCounter;

	float fadeOnLimit = 1.5f;
	float fadeOffLimit = 0.0f;
	float fadeCounter;
    float shakeTimeLimit;
    int up;

    private const string nextScene = "Tap the pill";

	void Start(){
        shake = false;
        shakeTimeLimit = 0.0f;
        fadeCounter = 0.0f;

//		halo = GetComponent ("Halo");
        //setHalo(false);
		arrow = GameObject.Find("Arrow");
		interactable = GameObject.Find ("Interactable");
		textToTap = GameObject.Find ("TextToTap");
		script = GetComponent<BottleCapTouchListener> ();
    }

    public override void undo()
    {
        Debug.Log("Bottle cap touch listener is undoing");
        arrow.SetActive(true);
		interactable.SetActive (true);
		textToTap.SetActive (true);
        pill.gameObject.SetActive(false);
		isFlickering = true;
		setCollider (true);
		setScript (true);
    }

    public override string getNextSceneName()
    {
        return nextScene;
    }

	void Update(){
		statusTracked = TouchController.objectIsFound;
        isShake();

		if (statusTracked) {
			if (isFlickering == true) {
				flickering ();
				jumpUpAndDown();
				resetTimeCounter();
			}
		} else {
			//setHalo(false);
		}
	}

//	public void setHalo (bool status){
//		halo.GetType ().GetProperty ("enabled").SetValue (halo, status, null);
//	}

	public void setCollider (bool status){
		this.gameObject.GetComponent<Collider>().enabled = status;
	}


	public void setScript (bool status){
		Debug.Log ("My status" + status);
		script.enabled = status;
	}

    public void flickering()
    {
        if (fadeCounter >= fadeOnLimit)
        {
            up = -1;
           // setHalo(false);
        }
        else if (fadeCounter <= fadeOffLimit)
        {
            up = 1;
            //setHalo(true);
        }
        fadeCounter += 0.05f * up;
    }

	public void jumpUpAndDown(){
		if (jumpUpTimeCounter < jumpUpTime) {
			jumpUpTimeCounter += Time.deltaTime;
			arrow.transform.Translate (Vector3.up * 10 * Time.deltaTime, Space.World);
		} else {
			if (jumpDownTimeCounter < jumpDownTime) {
				jumpDownTimeCounter += Time.deltaTime;
				arrow.transform.Translate (Vector3.down * 10 * Time.deltaTime, Space.World);
			}
		}
	}

	public void resetTimeCounter(){
		if (jumpDownTimeCounter > 1.5f && jumpUpTimeCounter > 1.5f) {
			jumpDownTimeCounter = 0f;
			jumpUpTimeCounter = 0f;
		}
	}

	public override void touchHandler()
	{
        addToUndo();
        pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);

		arrow.SetActive (false);
		interactable.SetActive (false);
		textToTap.SetActive (false);
		isClicked = true;
		//setHalo (false);
		isClicked = true;
		isFlickering = false;

		// set the collider to false
		setCollider (false);
		setScript (false);	
	}

    public void isShake()
    {
        
        if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 50.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 310.0)
        {
            shake = true;
            shakeTimeLimit = 1.50f;
        }
        if (shake)
        {
            shakeTimeLimit -= Time.deltaTime;
            if (shakeTimeLimit <= 0.0f)
                shake = false;
            if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 40.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 340.0)
            {
                isClicked = true;
            }
        }
    }
	
}
