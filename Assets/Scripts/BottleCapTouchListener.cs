using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
	Component halo;
	Transform pill;

    bool shake;
	bool statusTracked;
	public static bool isClicked = false;

	float fadeOnLimit = 1.5f;
	float fadeOffLimit = 0.0f;
	float fadeCounter;
    float shakeTimeLimit;
    int up;

	void Start(){
        shake = false;
        shakeTimeLimit = 0.0f;
        halo = GetComponent ("Halo");
        fadeCounter = 0.0f;
	}

	void Update(){
		statusTracked = TouchController.objectIsFound;
		setHalo (false);
        isShake();

		if (statusTracked) {
			flickering ();
		}

		if (isClicked == true) {    
			setHalo (false);
		}
	}

	public void setHalo (bool status){
		halo.GetType ().GetProperty ("enabled").SetValue (halo, status, null);
	}

    public void changeSize (float size){
        RenderSettings.haloStrength -= size;
    }

    public void flickering()
    {
        setHalo(true);
        if (fadeCounter >= fadeOnLimit)
        {
            up = -1;
            setHalo(false);
        }
        else if (fadeCounter <= fadeOffLimit)
        {
            up = 1;
            setHalo(true);
        }
        fadeCounter -= 10 * up;
    }

	public override void touchHandler()
	{	pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);

		//disable the glow
		isClicked = true;
	}

    public void isShake()
    {
        
        if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 50.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 310.0)
        {
            shake = true;
            shakeTimeLimit = 0.50f;
        }
        if (shake)
        {
            shakeTimeLimit -= Time.deltaTime;
            if (shakeTimeLimit <= 0.0f)
                shake = false;
            if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 40.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 340.0)
            {
                Debug.Log("shake!");
            }
        }
    }
}
